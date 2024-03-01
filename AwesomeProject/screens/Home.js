import React from "react";
import { Image, StyleSheet, ScrollView, Pressable, View } from "react-native";

export default function Home() {
  const onPressCard = () => {
    console.log("Card Pressed!");
  };

  const cards = [
    require("../assets/home2.jpeg"),
    require("../assets/home.jpeg"),
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cards.map((source, index) => (
        <View key={index} style={styles.card}>
          <Pressable
            onPress={onPressCard}
            style={({ pressed }) => [
              styles.imageContainer,
              pressed ? styles.pressed : {},
            ]}
          >
            <Image source={source} style={styles.image} resizeMode="cover" />
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  card: {
    width: 167,
    height: 250,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.42,
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
    opacity: 0.5,
  },
});
