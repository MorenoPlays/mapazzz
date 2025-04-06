import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function TelaAprender() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Aprendizado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
