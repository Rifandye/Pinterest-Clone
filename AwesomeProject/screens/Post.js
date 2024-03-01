import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import Icon from "react-native-vector-icons/AntDesign";

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
  };

  return (
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
      <TouchableOpacity style={styles.reviewButton} onPress={handleReviewPress}>
        <Text style={styles.reviewButtonText}>Give this photo a review</Text>
      </TouchableOpacity>
    </ScrollView>
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
    paddingLeft: 20, // Align content to the left with some padding
  },
  heartButton: {
    marginRight: 15, // Add some space between the heart icon and the text
  },
  likesText: {},
  likeUsername: {},
  information: {
    alignItems: "flex-start", // Align text to the left
    paddingLeft: 20, // Align content to the left with some padding
    gap: 15,
  },
  reviewButton: {
    marginTop: 20,
    backgroundColor: "#007bff", // Example blue color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20, // Add some margin to the sides
  },
  reviewButtonText: {
    color: "#ffffff", // White text color
    fontSize: 16,
  },
});
