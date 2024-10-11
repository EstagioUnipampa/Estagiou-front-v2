import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import Button from "../../components/button/Button";
import HeaderBack from "../../components/headerBack/HeaderBack";
import InputText from "../../components/inputText/InputText";
import ModalAlert from "../../components/modalAlert/ModalAlert";

type RootStackParamList = {
  Home: undefined;
  BusinessLogin: undefined;
};

type StudentLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BusinessLogin"
>;

type Props = {
  navigation: StudentLoginScreenNavigationProp;
};

export default function BusinessLogin({ navigation }: Readonly<Props>) {
  const fontsLoaded = useAppFonts();
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function onPress() {
    console.log("DADOS QUE SERÃO ENVIADOS: ");
    console.log("Email: ", email);
    console.log("Senha: ", senha);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderBack title="Empresa" onPress={() => navigation.navigate("Home")} />
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
            <Button text="Login" onPress={onPress} />
          </View>
        </View>
      </View>
      {!keyboardVisible && (
        <ModalAlert
          value={modalVisible}
          setValue={setModalVisible}
          title="Primeira vez no App?"
          description="Entre em contato com a instituição de ensino e obtenha o login para a sua empresa."
        />
      )}
      {!keyboardVisible && (
        <View style={styles.containerQuestion}>
          <TouchableOpacity
            style={styles.containerQuestionButton}
            activeOpacity={0.7}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.questionButton}>?</Text>
          </TouchableOpacity>
        </View>
      )}
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
  containerQuestionButton: {
    backgroundColor: "#23A331",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
  },
  questionButton: {
    color: "white",
    fontSize: 36,
    fontFamily: "Poppins_600SemiBold",
  },
  containerQuestion: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
});
