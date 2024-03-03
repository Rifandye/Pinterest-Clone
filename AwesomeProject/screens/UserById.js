import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const GET_USER_PROFILE = gql`
  query Query($userByIdId: ID!) {
    userById(id: $userByIdId) {
      _id
      email
      followingUser {
        username
      }
      followerUser {
        username
      }
      name
      username
    }
  }
`;

const FOLLOW = gql`
  mutation AddFollow($newFollow: NewFollow) {
    addFollow(newFollow: $newFollow) {
      _id
      createdAt
      followerId
      followingId
      updatedAt
    }
  }
`;

export default function UserById({ route }) {
  const { setIsSignedIn } = useContext(AuthContext);
  const { _id } = route.params;
  console.log(_id);

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      userByIdId: _id,
    },
    refetchQueries: [GET_USER_PROFILE],
  });
  console.log({ loading, error, data });

  const [handleFollow] = useMutation(FOLLOW, {
    refetchQueries: [GET_USER_PROFILE],
  });

  async function handleClickedFollow() {
    try {
      const result = await handleFollow({
        variables: {
          newFollow: {
            followingId: _id,
          },
        },
      });
      Alert.alert("Successfully following this account");
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data.userById;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
          style={styles.profilePic}
          source={require("../assets/mockup.jpeg")}
        />
        <View style={styles.infoSection}>
          <Text style={styles.username}>{user.username}</Text>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <View style={styles.statsContainer}>
            <Text>{user.followerUser.length} Followers</Text>
            <Text>{user.followingUser.length} Following</Text>
          </View>
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleClickedFollow}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.followButtonText}>Loading...</Text>
            ) : (
              <Text style={styles.followButtonText}>Follow</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoSection: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  followButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  followButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});
