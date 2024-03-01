import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Card from "../components/card";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query Query {
    posts {
      imgUrl
      _id
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {data?.posts.map((post, index) => (
          <Card key={index} imgUrl={post.imgUrl} _id={post._id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
