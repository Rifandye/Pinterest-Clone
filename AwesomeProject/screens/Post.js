import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import Icon from "react-native-vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMemo, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Comment from "../components/comment";

const GET_POSTS_BYID = gql`
  query PostById($postByIdId: ID!) {
    postById(id: $postByIdId) {
      content
      tags
      imgUrl
      comments {
        content
        username
      }
      likes {
        username
      }
      createdAt
      updatedAt
      authorDetail {
        username
      }
    }
  }
`;

export default function Post({ route }) {
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "100%"], []);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const { _id } = route.params;
  console.log(_id);

  const { loading, error, data } = useQuery(GET_POSTS_BYID, {
    variables: { postByIdId: _id },
  });
  console.log({ loading, error, data });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  const { content, imgUrl, authorDetail, comments, likes } = data.postById;

  const handleReviewPress = () => {
    console.log("Review Button Pressed!");
    setBottomSheetIndex(3);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imgUrl }} style={styles.image}></Image>
        </View>
        <View style={styles.likesContainer}>
          <TouchableOpacity style={styles.heartButton}>
            <Icon name="hearto" size={28} color="black" />
          </TouchableOpacity>
          {likes?.length > 0 && (
            <>
              <Text style={styles.likesText}>{likes.length} Likes</Text>
              <Text style={styles.likeUsername}> by {likes[0].username}</Text>
            </>
          )}
        </View>
        <View style={styles.information}>
          <Text>Uploaded by: {authorDetail.username}</Text>
          <Text style={{ marginTop: 20 }}>Desciption:</Text>
          <Text>{content}</Text>
        </View>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={handleReviewPress}
        >
          <Text style={styles.reviewButtonText}>Give this photo a review</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheet
        index={bottomSheetIndex}
        snapPoints={snapPoints}
        onChange={setBottomSheetIndex}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        enablePanDownToClose={true}
      >
        <Comment _id={_id} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: "80%",
    height: 500,
    resizeMode: "contain",
    borderRadius: 30,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
  },
  heartButton: {
    marginRight: 15,
  },
  likesText: {},
  likeUsername: {},
  information: {
    alignItems: "flex-start",
    paddingLeft: 20,
    gap: 15,
  },
  reviewButton: {
    marginTop: 45,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  reviewButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  bottomSheetBackground: {
    backgroundColor: "#808080",
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
});
