import { Text, View, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { setIsSignedIn } = useContext(AuthContext);

  async function handleLogOut() {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          handleLogOut();
        }}
      />
    </View>
  );
}
