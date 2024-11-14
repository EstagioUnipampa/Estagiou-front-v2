import React, { useEffect, useState } from "react";
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
import { RouteProp } from "@react-navigation/native";
import HeaderBack from "../../components/headerBack/HeaderBack";

type RootStackParamList = {
  StudentList: undefined;
  StudentProfileFromCompany: { studentId: string };
};

type StudentListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StudentList"
>;
type StudentListRouteProp = RouteProp<RootStackParamList, "StudentList">;

type Props = {
  navigation: StudentListNavigationProp;
  route: StudentListRouteProp;
};

type Student = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  courseName: string;
};

const StudentList: React.FC<Props> = ({ navigation }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const handleStudentPress = (studentId: string) => {
    console.log("Tentando navegar para o perfil do estudante:", studentId);
    try {
      navigation.navigate("StudentProfileFromCompany", {
        studentId: studentId,
      });
    } catch (error) {
      console.error("Erro na navegação:", error);
      Alert.alert("Erro", "Não foi possível abrir o perfil do estudante");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");
        console.log("Token recuperado:", secureToken ? "Sim" : "Não");

        const response = await fetch(`http://10.0.2.2:8080/v1/student/list`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secureToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data: Student[] = await response.json();
          console.log("Estudantes carregados:", data.length);
          setStudents(data);
        } else {
          console.log("Erro ao buscar dados dos estudantes");
          Alert.alert(
            "Erro",
            "Não foi possível carregar a lista de estudantes"
          );
        }
      } catch (error) {
        console.error("Erro ao buscar estudantes:", error);
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
});

export default StudentList;
