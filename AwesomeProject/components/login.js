import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <BottomSheetTextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      <BottomSheetTextInput
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, styles.passwordInput]}
      />
      <TouchableOpacity style={styles.button}>
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
