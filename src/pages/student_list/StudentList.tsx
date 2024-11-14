import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import HeaderBack from "../../components/headerBack/HeaderBack";

type RootStackParamList = {
  StudentList: { vacancyId: string };
  StudentProfileFromCompany: {
    vacancyId: string;
    studentId: string;
    onStatusUpdate: (status: string) => void;
  };
};

type StudentListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StudentList"
>;
type StudentListRouteProp = RouteProp<RootStackParamList, "StudentList">;

type Props = {
  navigation: StudentListNavigationProp;
};

type Student = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  courseName: string;
  status: string;
  skills: string[];
};

const StudentList: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<StudentListRouteProp>();
  const { vacancyId } = route.params;
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const updateStudentStatus = useCallback(
    (studentId: string, status: string) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId ? { ...student, status } : student
        )
      );
    },
    []
  );

  const handleStudentPress = (studentId: string) => {
    navigation.navigate("StudentProfileFromCompany", {
      vacancyId,
      studentId,
      onStatusUpdate: (status: string) =>
        updateStudentStatus(studentId, status),
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");
        const response = await fetch(
          `http://10.0.2.2:8080/v1/jobvacancy/${vacancyId}/enrollments`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data: { enrollments: Student[] } = await response.json();
          setStudents(data.enrollments);
        } else {
          Alert.alert(
            "Erro",
            "Não foi possível carregar a lista de estudantes"
          );
        }
      } catch (error) {
        Alert.alert("Erro", "Erro ao carregar os dados");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBack title="Inscritos na Vaga" onPress={() => navigation.pop()} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          {students.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleStudentPress(item.id)}
              style={styles.card}
            >
              <View>
                <Text
                  style={styles.name}
                >{`${item.name} ${item.lastName}`}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.course}>{`Curso: ${item.courseName}`}</Text>
                <Text style={styles.course}>{`Status: ${
                  item.status ?? "Pendente"
                }`}</Text>
                <Text style={styles.skills}>{`Habilidades: ${item.skills.join(
                  ", "
                )}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF6FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  course: {
    fontSize: 14,
    color: "#444",
  },
  skills: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
  },
});

export default StudentList;
