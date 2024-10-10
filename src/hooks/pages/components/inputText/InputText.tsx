import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppFonts } from "../../../useAppFonts";

interface InputTextProps {
  placeholder: string;
  secureTextEntry?: boolean;
  inputPassword?: boolean;
  onChange: (value: string) => void;
  handleShowPassword?: () => void;
}

export default function InputText({
  placeholder,
  secureTextEntry,
  inputPassword,
  onChange,
  handleShowPassword,
}: Readonly<InputTextProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholderTextColor={"rgba(50, 50, 50, 0.4)"}
        placeholder={placeholder}
        cursorColor={"#000"}
        onChange={(e) => onChange(e.nativeEvent.text)}
        secureTextEntry={inputPassword && secureTextEntry}
      />
      {inputPassword && (
        <TouchableOpacity onPress={handleShowPassword} activeOpacity={0.7}>
          {secureTextEntry && (
            <Image
              style={styles.icon}
              source={require("../../../../../assets/icon/eye.png")}
            />
          )}
          {!secureTextEntry && (
            <Image
              style={styles.icon}
              source={require("../../../../../assets/icon/eyeOff.png")}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: "#1A7924",
    backgroundColor: "white",
    height: 64,
    borderWidth: 1,
    borderRadius: 50,
    paddingRight: 29,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    paddingLeft: 29,
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    height: "100%",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
