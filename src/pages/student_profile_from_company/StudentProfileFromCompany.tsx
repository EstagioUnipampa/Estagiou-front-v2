import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import HeaderBack from "../../components/headerBack/HeaderBack";

type RootStackParamList = {
  StudentList: undefined;
  StudentProfileFromCompany: { studentId: string };
};

type Props = {
  route: RouteProp<RootStackParamList, "StudentProfileFromCompany">;
  navigation: StackNavigationProp<
    RootStackParamList,
    "StudentProfileFromCompany"
  >;
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
  console.log("Componente StudentProfileFromCompany montado");
  console.log("Parâmetros recebidos:", route.params);

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect executado");

    const fetchStudent = async () => {
      console.log("Iniciando fetchStudent");

      if (!route.params?.studentId) {
        console.log("StudentId não encontrado nos parâmetros");
        Alert.alert("Erro", "ID do estudante não encontrado");
        navigation.goBack();
        return;
      }

      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");
        console.log("Token recuperado:", secureToken ? "Sim" : "Não");

        const response = await fetch(
          `http://10.0.2.2:8080/v1/student/${route.params.studentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Status da resposta:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Dados recebidos:", data);
          setStudent(data);
        } else {
          console.log("Resposta não ok:", response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Erro detalhado:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do estudante", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } finally {
        console.log("Finalizando fetch");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [route.params?.studentId, navigation]);

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
            <Text
              style={styles.name}
            >{`${student.name} ${student.lastName}`}</Text>
            <Text style={styles.email}>{`Email: ${student.email}`}</Text>
            <Text style={styles.course}>{`Curso: ${student.courseName}`}</Text>
            <Text style={styles.phone}>{`Telefone: ${
              student.phoneNumber || "Não informado"
            }`}</Text>
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
});

export default StudentProfileFromCompany;
