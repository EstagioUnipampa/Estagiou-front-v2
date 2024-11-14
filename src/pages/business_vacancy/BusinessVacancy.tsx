import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import HeaderBack from "../../components/headerBack/HeaderBack";
import BusinessVacancyCard from "./components/BusinessVacancyCard";

type RootStackParamList = {
  Home: undefined;
  BusinessVacancy: undefined;
  BottomTab: undefined;
  BusinessDetailsJobVacancy: undefined;
  StudentList: { vacancyId: string };
};

type BusinessVacancyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BusinessVacancy"
>;

type Props = {
  navigation: BusinessVacancyScreenNavigationProp;
};

type JobVacancy = {
  id: string;
  title: string;
  role: string;
  description: string;
  salary: string;
  hours: string;
  modality: string;
};

type CompanyProfile = {
  jobVacancies: JobVacancy[];
};

export default function BusinessVacancy({ navigation }: Readonly<Props>) {
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");
        const response = await fetch(
          "http://10.0.2.2:8080/v1/company/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data: CompanyProfile = await response.json();
          setJobVacancies(data.jobVacancies); // Atualiza o estado com as vagas de emprego
        } else {
          console.error("Erro ao buscar as vagas de emprego");
        }
      } catch (error) {
        console.error("Erro ao buscar vagas de emprego:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobVacancies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBack title="Vagas criadas" onPress={() => navigation.pop()} />
      <View>
        {jobVacancies.map((vacancy) => (
          <BusinessVacancyCard
            key={vacancy.id}
            businessName="Company 2"
            vacancy={vacancy.title}
            source={require("../../../assets/images/companyLogo1.png")}
            onPress={() =>
              navigation.navigate("StudentList", { vacancyId: vacancy.id })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF6FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
