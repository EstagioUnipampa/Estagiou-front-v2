import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import Button from "../../components/button/Button";
import HeaderBack from "../../components/headerBack/HeaderBack";
import InputText from "../../components/inputText/InputText";
import ModalAlert from "../../components/modalAlert/ModalAlert";
import OptionText from "../../components/optionText/OptionText";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";

type RootStackParamList = {
  StudentSignUp: undefined;
  StudentLogin: undefined;
};

type StudentSignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StudentSignUp"
>;

type Props = {
  navigation: StudentSignUpScreenNavigationProp;
};

export default function StudentSignUp({ navigation }: Readonly<Props>) {
  const fontsLoaded = useAppFonts();
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleSignUp() {
    console.log("DADOS QUE SERÃO ENVIADOS: ");
    console.log("Email: ", email);
    console.log("Senha: ", password);
    console.log("Nome: ", name);
    console.log("Sobrenome: ", lastName);
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
    return <LoadingIcon />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderBack
          title="Estudante"
          onPress={() => navigation.navigate("StudentLogin")}
        />
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.titleText}>Cadastro</Text>
            <Text style={styles.titleDescription}>
              Realize o cadastro da sua conta:
            </Text>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formFields}>
              <InputText placeholder="Email" onChange={setEmail}></InputText>
              <InputText
                placeholder="Senha"
                secureTextEntry={showPassword}
                onChange={setPassword}
                inputPassword={true}
                handleShowPassword={handleShowPassword}
              ></InputText>
              <InputText placeholder="Nome" onChange={setName}></InputText>
              <InputText
                placeholder="Sobrenome"
                onChange={setLastName}
              ></InputText>
            </View>
            <View style={styles.buttonGroup}>
              <Button text="Login" onPress={handleSignUp} />
              <OptionText
                text="Já possui conta? Faça login"
                onPress={() => navigation.navigate("StudentLogin")}
              />
            </View>
          </View>
        </View>

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
        {!keyboardVisible && (
          <View
            style={[
              styles.containerModal,
              !modalVisible && { display: "none" },
            ]}
          >
            <ModalAlert
              value={modalVisible}
              setValue={setModalVisible}
              title="Primeira vez no App?"
              description="Utilize o email da sua instituição de ensino para realizar o cadastro. Caso não possua um email institucional, entre em contato com a sua instituição."
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  containerModal: {
    display: "flex",
  },
});
