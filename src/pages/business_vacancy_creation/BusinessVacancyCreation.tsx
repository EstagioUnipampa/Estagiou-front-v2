import { StackNavigationProp } from "@react-navigation/stack";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import HeaderBack from "../../components/headerBack/HeaderBack";
import InputText from "../../components/inputText/InputText";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../components/button/Button";
import * as SecureStore from "expo-secure-store";

type RootStackParamList = {
  BusinessVacancyCreation: undefined;
  BottomTabBusiness: undefined;
};

type BusinessVacancyCreationNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BusinessVacancyCreation"
>;

type Props = {
  navigation: BusinessVacancyCreationNavigationProp;
};

export default function BusinessVacancyCreation({
  navigation,
}: Readonly<Props>) {
  const fontsLoaded = useAppFonts();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [location, setLocation] = useState("Presencial");
  const [course, setCourse] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [hours, setHours] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

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

  async function handleCreateJobVacancy() {
    if (
      !title ||
      !role ||
      !hours ||
      !salary ||
      !description ||
      !location ||
      !course ||
      skills.length === 0
    ) {
      alert("Preencha todos os campos para criar a vaga");
      return;
    }

    if (isNaN(Number(salary)) || isNaN(Number(hours))) {
      alert("Remuneração e horas devem ser números");
      return;
    }

    const body = {
      title,
      role,
      hours,
      salary,
      description,
      modality: location,
      course,
      skills,
    };

    const secureToken = await SecureStore.getItemAsync("secure_token");

    fetch("http://10.0.2.2:8080/v1/jobvacancy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secureToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          setTitle("");
          setRole("");
          setHours("");
          setSalary("");
          setDescription("");
          setLocation("Presencial");
          setCourse("");
          setSkills([]);
          alert("Vaga criada com sucesso!");
          navigation.navigate("BottomTabBusiness");
        } else {
          alert("Erro ao criar vaga");
          console.error("Erro ao criar vaga: ", response);
        }
      })
      .catch((error) => {
        console.error("Erro ao criar vaga: ", error);
        alert("Erro ao criar vaga: " + error.message);
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderBack title="Criar Nova Vaga" onPress={() => navigation.pop()} />
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.titleText}>
              Adicione as Informações da Vaga
            </Text>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formFields}>
              <Text style={styles.inputTitle}>Título</Text>
              <InputText
                placeholder="Título da vaga"
                onChange={(e) => setTitle(e)}
                value={title}
              />

              <Text style={styles.inputTitle}>Cargo</Text>
              <InputText
                placeholder="Cargo da vaga"
                onChange={(e) => setRole(e)}
                value={role}
              />

              <Text style={styles.inputTitle}>Horas</Text>
              <InputText
                placeholder="Horas da vaga"
                onChange={(e) => setHours(e)}
                value={hours}
              />

              <Text style={styles.courseTitle}>Curso da Vaga</Text>
              <Dropdown
                style={styles.dropdown}
                data={courseOptions}
                containerStyle={{ borderRadius: 20 }}
                labelField="label"
                valueField="value"
                placeholderStyle={{ color: "rgba(50, 50, 50, 0.4)" }}
                placeholder="Selecione o curso"
                value={course}
                onChange={(item: { value: SetStateAction<string> }) =>
                  setCourse(item.value)
                }
              />

              <View style={styles.containerSkillTitle}>
                <Text style={styles.skillTitle}>
                  Selecione as skills da vaga
                </Text>
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

              <Text style={styles.inputTitle}>Remuneração</Text>
              <InputText
                placeholder="Remuneração"
                onChange={(e) => setSalary(e)}
                value={salary}
              />

              <Text style={styles.inputTitle}>Localização</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={location}
                  style={styles.picker}
                  onValueChange={(itemValue) => setLocation(itemValue)}
                >
                  <Picker.Item label="Presencial" value="Presencial" />
                  <Picker.Item label="Remoto" value="Remoto" />
                  <Picker.Item label="Híbrido" value="Híbrido" />
                </Picker>
              </View>

              <Text style={styles.inputTitle}>Descrição</Text>
              <InputText
                placeholder="Adicione na descrição os documentos que o candidato deve enviar."
                onChange={(e) => setDescription(e)}
                multiline={true}
                value={description}
              />
            </View>
            <Button text="Criar vaga" onPress={handleCreateJobVacancy} />
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
    color: "#212121",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  inputTitle: {
    color: "#585858",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textAlign: "left",
  },
  formGroup: {
    marginTop: 20,
    rowGap: 31,
  },
  formFields: {
    rowGap: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pickerContainer: {
    borderColor: "#1A7924",
    backgroundColor: "white",
    height: 64,
    borderWidth: 1,
    borderRadius: 50,
    paddingRight: 29,
    overflow: "hidden",
  },
  picker: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
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
  courseTitle: {
    color: "#585858",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    textAlign: "left",
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
