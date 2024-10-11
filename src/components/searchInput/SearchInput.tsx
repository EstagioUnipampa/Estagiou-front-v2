import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";

interface SearchInputProps {
  placeholder: string;
  onChange: (value: string) => void;
}

export default function SearchInput({
  placeholder,
  onChange,
}: Readonly<SearchInputProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.inputContainer}>
      <Image
        style={styles.icon}
        source={require("../../../assets/icon/glass.png")}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={"#585858"}
        placeholder={placeholder}
        cursorColor={"#000"}
        onChange={(e) => onChange(e.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginStart: 23,
  },
  inputContainer: {
    borderColor: "#1A7924",
    backgroundColor: "white",
    height: 58,
    borderWidth: 1,
    borderRadius: 50,
    paddingRight: 29,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    paddingLeft: 16,
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    height: "100%",
  },
});
