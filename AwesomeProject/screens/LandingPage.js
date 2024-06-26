//app.js adalah entry point dari applikasi

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "../components/login";
import Register from "../components/register";

export default function LandingPage({ navigation }) {
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "90%"], []); //dapat di adjust untuk ngatur si bottom screen
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  const [content, setContent] = useState("");

  const handleButtonPress = (type) => {
    setContent(type);
    setBottomSheetIndex(3);
  };

  const handleRegistrationSuccess = () => {
    setContent("login");
    setBottomSheetIndex(3);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/home2.jpeg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome to Interest</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleButtonPress("login")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonPress("signup")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <BottomSheet
          index={bottomSheetIndex}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
          onChange={(index) => {
            if (index === -1) {
              setBottomSheetIndex(-1);
            }
          }}
          enablePanDownToClose={true}
        >
          {content === "login" && <Login navigation={navigation} />}
          {content === "signup" && (
            <Register
              navigation={navigation}
              onRegistrationSuccess={handleRegistrationSuccess}
            />
          )}
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
    backgroundColor: "#808080",
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
