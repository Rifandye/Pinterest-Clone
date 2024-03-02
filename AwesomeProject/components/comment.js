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
import { formatDistanceToNow } from "date-fns";

const GET_COMMENT_BY_ID = gql`
  query Query($postByIdId: ID!) {
    postById(id: $postByIdId) {
      comments {
        content
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export default function Comment({ _id }) {
  const { loading, error, data } = useQuery(GET_COMMENT_BY_ID, {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Comments</Text>
      {data.postById.comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Image
            style={styles.image}
            source={require("../assets/mockup.jpeg")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{comment.username}</Text>
            <Text style={styles.content}>{comment.content}</Text>
            <Text style={styles.timestamp}>
              {formatDistanceToNow(new Date(parseInt(comment.createdAt, 10)), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 40,
  },
  commentContainer: {
    marginBottom: 20,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  content: {
    marginTop: 2,
  },
  timestamp: {
    marginTop: 4,
    fontSize: 12,
    color: "black",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
});
