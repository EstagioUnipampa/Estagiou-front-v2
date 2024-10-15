import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingIcon() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#23A331" style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 325,
  },
  indicator: {
    transform: [{ scale: 2.5 }],
  },
});
