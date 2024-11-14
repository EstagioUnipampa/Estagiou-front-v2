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
  interface SkillOption {
    label: string;
    value: string;
  }

  const [skillsOptions, setSkillsOptions] = useState<SkillOption[]>([]);

  interface CourseOption {
    label: string;
    value: string;
  }

  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);

  function fetchCourses() {
    fetch("http://10.0.2.2:8080/v1/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const courses = data.map((course: { name: string; id: string }) => ({
          label: course.name,
          value: course.id,
        }));
        setCourseOptions(courses);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos: ", error);
        alert("Erro ao buscar cursos: " + error.message);
      });
  }

  function updateSkillsOptions(selectedCourse: string) {
    fetch("http://10.0.2.2:8080/v1/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const courseData = data.find(
          (course: { id: string }) => course.id === selectedCourse
        );

        if (courseData && courseData.skills) {
          const updatedSkillsOptions = courseData.skills.map(
            (skill: { id: string; name: string }) => ({
              label: skill.name,
              value: skill.id,
            })
          );
          setSkillsOptions(updatedSkillsOptions);
        } else {
          setSkillsOptions([]);
        }

        setSkills([]);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos: ", error);
        alert("Erro ao buscar cursos: " + error.message);
      });
  }

  useEffect(() => {
    fetchCourses();
  }, []);

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
      course: course ? course : null,
      skills: skills ? skills : [],
      email,
      password,
    };

    console.log(body);

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
