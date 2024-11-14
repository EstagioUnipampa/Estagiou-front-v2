import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Header from "../../components/header/Header";
import BusinessVacancyCard from "./components/BusinessVacancyCard";
import { StackNavigationProp } from "@react-navigation/stack";
import HeaderBack from "../../components/headerBack/HeaderBack";

type RootStackParamList = {
  Home: undefined;
  BusinessVacancy: undefined;
  BottomTab: undefined;
  BusinessDetailsJobVacancy: undefined;
};

type BusinessVacancyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BusinessVacancy"
>;

type Props = {
  navigation: BusinessVacancyScreenNavigationProp;
};

export default function BusinesVacancy({navigation}: Readonly<Props>) {

  return (
    <ScrollView style={styles.container}>
      <HeaderBack
          title="Inscrições"
          onPress={() => navigation.pop()}
        />
      <View>
        <BusinessVacancyCard
          businessName="Nome da Empresa"
          vacancy="Nome da Vaga"
          source={require("../../../assets/images/companyLogo1.png")}
          onPress={() => navigation.navigate("BusinessDetailsJobVacancy")}
        />
        <BusinessVacancyCard
          businessName="Nome da Empresa"
          vacancy="Nome da Vaga"
          source={require("../../../assets/images/companyLogo1.png")}
          onPress={() => navigation.navigate("BusinessDetailsJobVacancy")}
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
