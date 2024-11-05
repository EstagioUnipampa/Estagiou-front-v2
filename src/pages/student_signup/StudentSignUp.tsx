import { StackNavigationProp } from "@react-navigation/stack";
import { SetStateAction, useEffect, useState } from "react";
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
import { Dropdown } from "react-native-element-dropdown";

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
  const [course, setCourse] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillsOptions, setSkillsOptions] = useState([
    { label: "JavaScript", value: "JavaScript" },
    { label: "React Native", value: "React Native" },
  ]);

  const courseOptions = [
    { label: "Ciência da Computação", value: "Ciência da Computação" },
    { label: "Engenharia Agrícola", value: "Engenharia Agrícola" },
    { label: "Engenharia Civil", value: "Engenharia Civil" },
    { label: "Engenharia de Software", value: "Engenharia de Software" },
    {
      label: "Engenharia de Telecomunicações",
      value: "Engenharia de Telecomunicações",
    },
    { label: "Engenharia Elétrica", value: "Engenharia Elétrica" },
    { label: "Engenharia Mecânica", value: "Engenharia Mecânica" },
  ];

  function updateSkillsOptions(selectedCourse: string) {
    const skillsByCourse: {
      [key: string]: { label: string; value: string }[];
    } = {
      "Ciência da Computação": [
        { label: "JavaScript", value: "JavaScript" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "Estrutura de Dados", value: "Estrutura de Dados" },
        { label: "Banco de Dados", value: "Banco de Dados" },
        { label: "Inteligência Artificial", value: "Inteligência Artificial" },
        { label: "Pensamento Crítico", value: "Pensamento Crítico" },
        { label: "Trabalho em Equipe", value: "Trabalho em Equipe" },
      ],
      "Engenharia Agrícola": [
        { label: "Matlab", value: "Matlab" },
        { label: "C++", value: "C++" },
        { label: "Sistemas de Irrigação", value: "Sistemas de Irrigação" },
        { label: "Topografia", value: "Topografia" },
        { label: "Gestão de Projetos", value: "Gestão de Projetos" },
        { label: "Sustentabilidade", value: "Sustentabilidade" },
        { label: "Comunicação", value: "Comunicação" },
        { label: "Liderança", value: "Liderança" },
      ],
      "Engenharia Civil": [
        { label: "AutoCAD", value: "AutoCAD" },
        { label: "SketchUp", value: "SketchUp" },
        { label: "Planejamento Urbano", value: "Planejamento Urbano" },
        { label: "Análise Estrutural", value: "Análise Estrutural" },
        { label: "Gestão de Obras", value: "Gestão de Obras" },
        { label: "Soluções Sustentáveis", value: "Soluções Sustentáveis" },
        { label: "Resolução de Problemas", value: "Resolução de Problemas" },
        { label: "Trabalho em Equipe", value: "Trabalho em Equipe" },
      ],
      "Engenharia de Software": [
        { label: "React Native", value: "React Native" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Desenvolvimento Web", value: "Desenvolvimento Web" },
        { label: "Arquitetura de Software", value: "Arquitetura de Software" },
        {
          label: "Controle de Versão (Git)",
          value: "Controle de Versão (Git)",
        },
        { label: "Testes Automatizados", value: "Testes Automatizados" },
        { label: "Comunicação Eficaz", value: "Comunicação Eficaz" },
        { label: "Resolução de Conflitos", value: "Resolução de Conflitos" },
      ],
      "Engenharia de Telecomunicações": [
        {
          label: "Fundamentos de Telecomunicações",
          value: "Fundamentos de Telecomunicações",
        },
        { label: "Processamento de Sinais", value: "Processamento de Sinais" },
        { label: "Redes de Computadores", value: "Redes de Computadores" },
        { label: "Comunicações Ópticas", value: "Comunicações Ópticas" },
        { label: "Eletrônica Digital", value: "Eletrônica Digital" },
        { label: "Proatividade", value: "Proatividade" },
        { label: "Adaptabilidade", value: "Adaptabilidade" },
        { label: "Colaboração", value: "Colaboração" },
      ],
      "Engenharia Elétrica": [
        { label: "Projetos de Circuitos", value: "Projetos de Circuitos" },
        { label: "Sistemas de Potência", value: "Sistemas de Potência" },
        { label: "Eletrônica de Potência", value: "Eletrônica de Potência" },
        { label: "Máquinas Elétricas", value: "Máquinas Elétricas" },
        { label: "Programação de CLP", value: "Programação de CLP" },
        { label: "Pensamento Crítico", value: "Pensamento Crítico" },
        { label: "Gestão de Tempo", value: "Gestão de Tempo" },
        { label: "Iniciativa", value: "Iniciativa" },
      ],
      "Engenharia Mecânica": [
        { label: "SolidWorks", value: "SolidWorks" },
        { label: "Termodinâmica", value: "Termodinâmica" },
        { label: "Mecânica dos Fluidos", value: "Mecânica dos Fluidos" },
        { label: "Projetos Mecânicos", value: "Projetos Mecânicos" },
        { label: "Manufatura e Produção", value: "Manufatura e Produção" },
        { label: "Trabalho em Equipe", value: "Trabalho em Equipe" },
        { label: "Pensamento Analítico", value: "Pensamento Analítico" },
        { label: "Comunicação Eficaz", value: "Comunicação Eficaz" },
      ],
    };

    setSkillsOptions(skillsByCourse[selectedCourse] || []);
    setSkills([]);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleSkillSelection(skill: string) {
    setSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((item) => item !== skill);
      } else if (prevSkills.length < 5) {
        return [...prevSkills, skill];
      }
      return prevSkills;
    });
  }

  useEffect(() => {
    updateSkillsOptions(course);
  }, [course]);

  async function handleSignUp() {
    const body = {
      name,
      lastName,
      course,
      skills,
      email,
      password,
    };

    fetch("http://10.0.2.2:8080/v1/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Cadastro realizado com sucesso!");
          navigation.navigate("StudentLogin");
        } else {
          return response.json().then((error) => {
            throw new Error(error.message || "Erro ao cadastrar");
          });
        }
      })
      .catch((error) => {
        console.error("Erro no cadastro: ", error);
        alert("Erro no cadastro: " + error.message);
      });
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
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
              <InputText placeholder="Email" onChange={setEmail} />
              <InputText
                placeholder="Senha"
                secureTextEntry={showPassword}
                onChange={setPassword}
                inputPassword={true}
                handleShowPassword={handleShowPassword}
              />
              <InputText placeholder="Nome" onChange={setName} />
              <InputText placeholder="Sobrenome" onChange={setLastName} />

              <Dropdown
                style={styles.dropdown}
                data={courseOptions}
                containerStyle={{ borderRadius: 20 }}
                labelField="label"
                valueField="value"
                placeholderStyle={{ color: "rgba(50, 50, 50, 0.4)" }}
                placeholder="Selecione seu curso"
                value={course}
                onChange={(item: { value: SetStateAction<string> }) =>
                  setCourse(item.value)
                }
              />

              <View style={styles.containerSkillTitle}>
                <Text style={styles.skillTitle}>Selecione suas skills</Text>
                <Text style={styles.skillsCount}>({skills.length}/5)</Text>
              </View>

              <View style={styles.ContainerSkill}>
                {skillsOptions.map((skill) => (
                  <TouchableOpacity
                    key={skill.value}
                    style={[
                      styles.skillItem,
                      skills.includes(skill.value) && styles.skillItemSelected,
                    ]}
                    onPress={() => toggleSkillSelection(skill.value)}
                  >
                    <Text
                      style={[
                        styles.skillText,
                        skills.includes(skill.value) &&
                          styles.skillTextSelected,
                      ]}
                    >
                      {skill.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.buttonGroup}>
              <Button text="Cadastrar" onPress={handleSignUp} />
              <OptionText
                text="Já possui conta? Faça login"
                onPress={() => navigation.navigate("StudentLogin")}
              />
            </View>
          </View>
        </View>
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
    flexGrow: 0,
  },
  containerModal: {
    display: "flex",
  },
  dropdown: {
    borderColor: "#1A7924",
    backgroundColor: "white",
    height: 64,
    borderWidth: 1,
    borderRadius: 50,
    paddingRight: 29,
    paddingLeft: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skillItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1A7924",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  skillItemSelected: {
    backgroundColor: "#1A7924",
  },
  skillText: {
    color: "#1A7924",
  },
  skillTextSelected: {
    color: "#FFFFFF",
  },
  ContainerSkill: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    borderWidth: 0,
    borderColor: "#1A7924",
    borderRadius: 20,
  },
  skillTitle: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    textAlign: "left",
    // paddingLeft: 29,
  },
  containerSkillTitle: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  skillsCount: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    textAlign: "left",
  },
});
