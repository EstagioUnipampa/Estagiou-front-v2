import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";

interface OptionTextProps {
  text: string;
  onPress: () => void;
}

export default function OptionText({
  text,
  onPress,
}: Readonly<OptionTextProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
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
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#585858",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});
