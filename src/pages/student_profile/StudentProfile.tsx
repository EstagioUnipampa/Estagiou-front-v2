import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppBar from "./components/AppBar";
import ProfilePic from "./components/ProfilePic";
import ProfileInfo from "./components/ProfileInfo";
import ContactOptions from "./components/ContactInfo";
import * as SecureStore from "expo-secure-store";

const StudentProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const secureId = await SecureStore.getItemAsync("secure_id");
        const secureToken = await SecureStore.getItemAsync("secure_token");

        const response = await fetch(
          `http://10.0.2.2:8080/v1/student/${secureId}`,
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
            name: data.name,
            email: data.email,
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
      <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.bodyContainer}>
        <View style={styles.topBackground} />
        <ProfilePic />
        <ProfileInfo name={userData.name} email={userData.email} />
        <ContactOptions />
      </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default StudentProfile;
