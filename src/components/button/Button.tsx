import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import LoadingIcon from "../loadingIcon/LoadingIcon";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export default function Button({ text, onPress }: Readonly<ButtonProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    backgroundColor: "#23A331",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  textButton: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
