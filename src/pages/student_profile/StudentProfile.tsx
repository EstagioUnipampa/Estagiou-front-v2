import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import AppBar from "./components/AppBar";
import ProfilePic from "./components/ProfilePic";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import ProfileInfo from "./components/ProfileInfo";
import ModalAlert from "../../components/modalAlert/ModalAlert";

interface UserData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  courseName: string;
  skills: string[];
}

const StudentProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");
        const response = await fetch(
          `http://10.0.2.2:8080/v1/student/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } else {
          console.log("Erro ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIcon />
      </View>
    );
  }

  if (!userData) {
    return (
      <Text style={styles.errorText}>
        Erro ao carregar os dados do usuário.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.bodyContainer}>
        <View style={styles.topBackground} />
        {/* Foto de Perfil e Informações */}
        <View style={styles.profileContainer}>
          <ProfilePic />
          <ProfileInfo
            name={userData.name}
            lastName={userData.lastName}
            email={userData.email}
            course={userData.courseName}
          />
        </View>

        {/* Título e Lista de Skills */}
        <Text style={styles.title}>Minhas Skills</Text>
        <FlatList
          data={userData.skills}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.skillItem}>{item}</Text>
          )}
        />
      </View>
      {!keyboardVisible && (
        <ModalAlert
          value={modalVisible}
          setValue={setModalVisible}
          title="Econtrou algum problema?"
          description="Entre em contato com o suporte em email@email.com"
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
  bodyContainer: {
    padding: 20,
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#23A331",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center", // Alinha a foto e as informações do perfil
    marginBottom: 250, // Adiciona espaçamento entre o perfil e a seção de skills
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  skillItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1A7924",
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
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

export default StudentProfile;
