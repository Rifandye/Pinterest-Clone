//app.js adalah entry point dari applikasi

import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/Twilight.jpeg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome to Interest</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => console.log("Login Pressed")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Sign Up Pressed")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <View style={styles.bottomSheetContent}>
            <Text>This is awesome</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
  },
  bottomSheetBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
