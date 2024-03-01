import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View, TouchableHighlight } from "react-native";

export default function Card({ imgUrl, _id }) {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableHighlight
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate("Post", {
            _id: _id,
          });
        }}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed ? styles.pressed : {},
        ]}
      >
        <Image
          source={{ uri: imgUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 250,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 21,
    overflow: "hidden",
    margin: 10,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pressed: {
    opacity: 0.75,
  },
});
