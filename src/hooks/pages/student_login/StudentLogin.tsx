import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppFonts } from "../../useAppFonts";
import Header from "../components/headerBack/Header";
import InputText from "../components/inputText/InputText";
import Button from "../components/button/Button";
import OptionText from "../components/optionText/OptionText";

export default function StudentLogin() {
  const fontsLoaded = useAppFonts();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title="Estudante" />
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.titleText}>Login</Text>
          <Text style={styles.titleDescription}>
            Realize o login na sua conta:
          </Text>
        </View>
        <View style={styles.formGroup}>
          <View style={styles.formFields}>
            <InputText placeholder="Email" onChange={setEmail}></InputText>
            <InputText
              placeholder="Senha"
              secureTextEntry={showPassword}
              onChange={setSenha}
              inputPassword={true}
              handleShowPassword={handleShowPassword}
            ></InputText>
          </View>
          <View style={styles.buttonGroup}>
            <Button text="Login" onPress={() => console.log("LOGIN")} />
            <OptionText
              text="Não possui conta? Cadastre-se"
              onPress={() => console.log("CADASTRO")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF6FF",
  },
  content: {
    paddingTop: 15,
    paddingStart: 30,
    paddingEnd: 30,
  },
  textContent: {
    rowGap: 6,
  },
  titleText: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
    textAlign: "left",
  },
  titleDescription: {
    color: "#585858",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "left",
  },
  formGroup: {
    marginTop: 40,
    rowGap: 31,
  },
  formFields: {
    rowGap: 18,
  },
  buttonGroup: {
    rowGap: 12,
  },
});
