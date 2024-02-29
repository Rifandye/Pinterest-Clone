import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <BottomSheetTextInput style={styles.input} placeholder="Name" />

      <BottomSheetTextInput style={styles.input} placeholder="Username" />

      <BottomSheetTextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <BottomSheetTextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
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
    color: "white",
    fontSize: 18,
  },
});
