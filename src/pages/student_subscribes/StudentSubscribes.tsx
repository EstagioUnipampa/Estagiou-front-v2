import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Header from "../../components/header/Header";
import SubscribeCard from "./components/SubscribeCard";

export default function StudentRegistrations() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Inscrições" />
      <View>
        <SubscribeCard
          businessName="Nome da empresa"
          title="Desenvolvimento de Sistemas"
          source={require("../../../assets/images/companyLogo1.png")}
          onPress={() => console.log("Card clicado")}
        />
        <SubscribeCard
          businessName="Nome da empresa2"
          title="Programador"
          source={require("../../../assets/images/companyLogo2.png")}
          onPress={() => console.log("Card clicado")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF6FF",
  },
});
