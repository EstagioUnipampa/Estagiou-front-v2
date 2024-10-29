import React, { useEffect, useState } from "react";
import { View, StyleSheet, Linking } from "react-native";
import AppBar from "./components/AppBar";
import ProfilePic from "./components/ProfilePic";
import * as SecureStore from "expo-secure-store";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import Button from "../../components/button/Button";
import ModalAlert from "../../components/modalAlert/ModalAlert";
import ProfileInfo from "./components/ProfileInfo";

const StudentProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    course: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
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
          const data = await response.json();
          setUserData({
            name: data.name || "",
            lastName: data.lastName || "",
            course: data.course || "",
            email: data.email || "",
          });
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

  const handleOpenInternshipInfo = () => {
    Linking.openURL("https://sites.unipampa.edu.br/estagios/");
  };

  const handleHelp = () => {
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View>
        <LoadingIcon />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.bodyContainer}>
        <View style={styles.topBackground} />
        <ProfilePic />
        <ProfileInfo
          name={userData.name}
          lastName={userData.lastName}
          email={userData.email}
        />

        <View style={styles.buttonContainer}>
          <Button
            text="Informações sobre Estágios"
            onPress={handleOpenInternshipInfo}
          />
          <Button text="Ajuda" onPress={handleHelp} />
        </View>
      </View>
      <ModalAlert
        value={modalVisible}
        setValue={setModalVisible}
        title="Ajuda"
        description="Para mais informações, entre em contato com o administrador."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF6FF",
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#23A331",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 600,
    alignItems: "center",
    gap: 20,
  },
});

export default StudentProfile;
