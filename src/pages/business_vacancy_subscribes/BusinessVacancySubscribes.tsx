import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Header from "../../components/header/Header";
import BusinessSubscribeCard from "./components/BusinessSubscribeCard";
import HeaderBack from "../../components/headerBack/HeaderBack";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Home: undefined;
    BusinessVacancy: undefined;
    BottomTab: undefined;
    BusinessDetailsJobVacancy: undefined;
    BusinessVacancySubscribes: undefined;
  };
  
  type BusinessVacancySubscribesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "BusinessVacancySubscribes"
  >;
  
  type Props = {
    navigation: BusinessVacancySubscribesScreenNavigationProp;
  };
  
export default function BusinessVacancySubscribes({navigation}: Readonly<Props>) {
  return (
    <ScrollView style={styles.container}>
      <HeaderBack
          title="Inscrições"
          onPress={() => navigation.pop()}
        />
      <View>
        <BusinessSubscribeCard
          studentName="Nome do Candidato"
          course="Curso do Candidato"
          source={require("../../../assets/images/userIcon.png")}
          onPress={() => console.log("Card clicado")}
        />
        <BusinessSubscribeCard
          studentName="Nome do Candidato"
          course="Curso do Candidato"
          source={require("../../../assets/images/userIcon.png")}
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
