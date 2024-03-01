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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imgUrl }} style={styles.image}></Image>
      </View>
      <View style={styles.information}>
        <Text>Uplouded by: {authorDetail.username}</Text>
        <Text>{content}</Text>
      </View>
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
  information: {
    alignItems: "center",
    gap: 10,
  },
});
