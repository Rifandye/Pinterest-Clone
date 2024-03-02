import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Mutation($inputLogin: LoginInput) {
    login(inputLogin: $inputLogin) {
      access_token
    }
  }
`;

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleLogin, { data, loading, error }] = useMutation(LOGIN);

  async function handleSubmit() {
    try {
      console.log("submit been pressed");
      const result = await handleLogin({
        variables: {
          inputLogin: {
            email: email,
            password: password,
          },
        },
      });
      console.log(result);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <BottomSheetTextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <BottomSheetTextInput
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, styles.passwordInput]}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 50,
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "white",
    fontSize: 16,
    color: "black",
  },
  button: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },

  image: {
    height: 250,
    width: 250,
  },
});
