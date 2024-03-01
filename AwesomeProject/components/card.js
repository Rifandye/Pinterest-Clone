import React from "react";
import { Image, StyleSheet, ScrollView, Pressable, View } from "react-native";

export default function Card({ imgUrl }) {
  const onPressCard = () => {
    console.log("Card Pressed!");
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPressCard}
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
      </Pressable>
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
