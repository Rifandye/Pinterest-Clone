import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../screens/LandingPage";
import Post from "../screens/Post";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TabNavigator from "./TabNavigator";
import AddPost from "../screens/AddPost";
import UserById from "../screens/UserById";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Landing">
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="UserById" component={UserById} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
