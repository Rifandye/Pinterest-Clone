import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../screens/LandingPage";
import Home from "../screens/Home";
import Post from "../screens/Post";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TabNavigator from "./TabNavigator";

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
