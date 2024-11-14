import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import HeaderBack from "../../components/headerBack/HeaderBack";
import Status from "./components/Status";

type RootStackParamList = {
  StudentList: undefined;
  StudentProfileFromCompany: {
    studentId: string;
    onStatusUpdate: (status: string) => void;
  };
};

type Props = {
  route: RouteProp<RootStackParamList, "StudentProfileFromCompany">;
  navigation: StackNavigationProp<RootStackParamList, "StudentProfileFromCompany">;
};

type StudentProfile = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  courseName: string;
  phoneNumber: string;
};

const StudentProfileFromCompany: React.FC<Props> = ({ route, navigation }) => {
  const { studentId, onStatusUpdate } = route.params;
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        Alert.alert("Erro", "ID do estudante não encontrado");
        navigation.goBack();
        return;
      }

      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");
        const response = await fetch(`http://10.0.2.2:8080/v1/student/${studentId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secureToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do estudante", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, navigation]);

  const updateStudentStatus = async (newStatus: string) => {
    try {
      const secureToken = await SecureStore.getItemAsync("secure_token");
      const response = await fetch(
        `http://10.0.2.2:8080/v1/student/${studentId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${secureToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setStatus(newStatus);
        onStatusUpdate(newStatus); // Atualiza o status na lista
        Alert.alert("Sucesso", `Status atualizado para: ${newStatus}`);
        navigation.goBack(); // Volta para a tela anterior
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o status");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar o status do estudante");
    }
  };

  const handleApprove = () => updateStudentStatus("Approved");
  const handleReject = () => updateStudentStatus("Rejected");

  return (
    <View style={styles.container}>
      <HeaderBack
        title="Perfil do Estudante"
        onPress={() => navigation.goBack()}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>
            Carregando dados do estudante...
          </Text>
        </View>
      ) : !student ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Dados do estudante não encontrados.
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{`${student.name} ${student.lastName}`}</Text>
                <Text style={styles.email}>{`Email: ${student.email}`}</Text>
                <Text style={styles.course}>{`Curso: ${student.courseName}`}</Text>
                <Text style={styles.phone}>{`Telefone: ${student.phoneNumber || "Não informado"}`}</Text>
              </View>
              <Status/> 
            </View>
          </View>
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
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  card: {
    padding: 15,
    margin: 16,
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
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  course: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: "#444",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default StudentProfileFromCompany;
