import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useQuery, gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation Mutation($newUser: NewUser) {
    addUser(newUser: $newUser) {
      _id
      name
      username
      email
    }
  }
`;

export default function Register({ navigation, onRegistrationSuccess }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [handleRegister] = useMutation(REGISTER);

  async function handleSubmit() {
    try {
      const result = await handleRegister({
        variables: {
          newUser: {
            email: email,
            name: name,
            username: username,
            password: password,
          },
        },
      });

      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }

      Alert.alert(
        `Welcome ${result.data.addUser.username}, Please Login to your account`
      );

      console.log(result);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <BottomSheetTextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />

      <BottomSheetTextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />

      <BottomSheetTextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <BottomSheetTextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
