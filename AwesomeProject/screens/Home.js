import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Card from "../components/card";
import { useQuery, gql } from "@apollo/client";
import { StatusBar } from "react-native";
import { useState } from "react";

export const GET_POSTS = gql`
  query Query {
    posts {
      imgUrl
      _id
    }
  }
`;

const GET_USERNAME = gql`
  query Query($username: String!) {
    searchUserByUsername(username: $username) {
      username
      _id
    }
  }
`;

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [search, setSearch] = useState("");
  const {
    data: userdata,
    loading: userLoading,
    error: errorLoading,
  } = useQuery(GET_USERNAME, {
    variables: { username: search },
    skip: !search,
  });

  console.log({ userdata, userLoading, errorLoading });

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
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {userLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          userdata &&
          userdata.searchUserByUsername.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("UserById", { _id: user._id })}
            >
              <Text style={styles.userItem}>{user.username}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer}>
          {data.posts.map((post) => (
            <Card key={post._id} imgUrl={post.imgUrl} _id={post._id} />
          ))}
        </View>
      </ScrollView>
    </View>
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
  bottomSheetBackground: {
    backgroundColor: "#808080",
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
