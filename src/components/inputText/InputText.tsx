import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import LoadingIcon from "../loadingIcon/LoadingIcon";

interface InputTextProps {
  placeholder: string;
  secureTextEntry?: boolean;
  inputPassword?: boolean;
  onChange: (value: string) => void;
  handleShowPassword?: () => void;
  multiline?: boolean;
  value?: string;
}

export default function InputText({
  placeholder,
  secureTextEntry,
  inputPassword,
  onChange,
  handleShowPassword,
  multiline = false,
  value,
}: Readonly<InputTextProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <View
      style={[styles.inputContainer, multiline && styles.multilineContainer]}
    >
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholderTextColor={"rgba(50, 50, 50, 0.4)"}
        placeholder={placeholder}
        cursorColor={"#000"}
        onChange={(e) => onChange(e.nativeEvent.text)}
        secureTextEntry={inputPassword && !secureTextEntry}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        value={value}
      />
      {inputPassword && (
        <TouchableOpacity onPress={handleShowPassword} activeOpacity={0.7}>
          <Image
            style={styles.icon}
            source={
              secureTextEntry
                ? require("../../../assets/icon/eyeOff.png")
                : require("../../../assets/icon/eye.png")
            }
          />
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
  multilineContainer: {
    height: 150,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  input: {
    paddingLeft: 29,
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    height: "100%",
    textAlignVertical: "center",
  },
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
