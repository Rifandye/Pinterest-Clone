import { StyleSheet, Text, ScrollView, TextInput, Button } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_POSTS } from "./Home";

const ADD_POST = gql`
  mutation Mutation($newPost: NewPost) {
    addPost(newPost: $newPost) {
      _id
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      content
      createdAt
      imgUrl
      updatedAt
    }
  }
`;

export default function AddPost({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const [handleAddPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS],
  });

  async function handleSubmit() {
    try {
      const result = await handleAddPost({
        variables: {
          newPost: {
            imgUrl: imgUrl,
            content: content,
            tags: tags,
          },
        },
      });
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
      />
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imgUrl}
        onChangeText={setImgUrl}
      />
      <Text style={styles.label}>Tags:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tags"
        value={tags}
        onChangeText={setTags}
      />
      <Button title="Post!" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
  },
});
