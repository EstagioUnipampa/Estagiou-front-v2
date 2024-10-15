import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "./components/AppBar";
import ProfilePic from "./components/ProfilePic";
import ProfileInfo from "./components/ProfileInfo";
import ContactOptions from "./components/ContactInfo";

const StudentProfile = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.bodyContainer}>
        <View style={styles.topBackground} />
        <ProfilePic />
        <ProfileInfo name="Nome do usuário" course="Curso do Aluno" />
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
});

export default StudentProfile;
