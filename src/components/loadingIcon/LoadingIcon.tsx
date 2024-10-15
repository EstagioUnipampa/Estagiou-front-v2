import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingIcon() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#23A331"
        style={styles.indicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "46%",
    left: "46%",
  },
  indicator: {
    transform: [{ scale: 2.5 }],
  },
});
