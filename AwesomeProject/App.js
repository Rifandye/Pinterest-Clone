//app.js adalah entry point dari applikasi

import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./config/appolo";
import StackNavigator from "./navigators/StackNavigator";
import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      try {
        let token = await SecureStore.getItemAsync("access_token");
        if (token) setIsSignedIn(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getToken();
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Wait</Text>
      </View>
    );

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
