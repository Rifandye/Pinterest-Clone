import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

const ADD_COMMENT = gql`
  mutation Mutation($newComment: NewComment) {
    addComment(newComment: $newComment) {
      content
      username
      createdAt
    }
  }
`;

export default function Comment({ _id }) {
  const [content, setContent] = useState("");

  const [handleComment] = useMutation(ADD_COMMENT);

  async function handleSubmit() {
    try {
      const result = await handleComment({
        variables: {
          newComment: {
            content: content,
            postId: _id,
          },
        },
      });
      setContent("");
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const { loading, error, data } = useQuery(GET_COMMENT_BY_ID, {
    variables: { postByIdId: _id },
  });
  console.log({ loading, error, data });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 124 : 0}
      enabled
    >
      <ScrollView style={styles.commentsContainer}>
        <Text style={styles.header}>Comments</Text>
        {data?.postById?.comments && data.postById.comments.length > 0 ? (
          data.postById.comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Image
                style={styles.image}
                source={require("../assets/mockup.jpeg")}
              />
              <View style={styles.textContainer}>
                <Text style={styles.username}>{comment.username}</Text>
                <Text style={styles.content}>{comment.content}</Text>
                <Text style={styles.timestamp}>
                  {formatDistanceToNow(
                    new Date(parseInt(comment.createdAt, 10)),
                    {
                      addSuffix: true,
                    }
                  )}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.centeredView}>
            <Text>No comments yet.</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setContent}
          value={content}
          placeholder="Write a comment..."
        />
        <TouchableOpacity onPress={handleSubmit}>
          <MaterialCommunityIcons name="send" size={24} color="#1E90FF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsContainer: {
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
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
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
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 50,
  },
  input: {
    height: 40,
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
