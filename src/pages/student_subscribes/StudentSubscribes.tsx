import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Header from "../../components/header/Header";
import SubscribeCard from "./components/SubscribeCard";
import AvailableCard from "../business_home/components/AvailableCard";

export default function StudentRegistrations() {
  const isFocused = useIsFocused();
  type JobVacancyList = {
    jobVacancy: {
      id: string;
      title: string;
      role: string;
      description: string;
      salary: string;
      hours: string;
      modality: string;
      status: string;
      company: {
        name: string;
      };
    };
    status: string;
  };

  const [dataList, setDataList] = useState<JobVacancyList[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const secureToken = await SecureStore.getItemAsync("secure_token");

      const response = await fetch(
        `http://10.0.2.2:8080/v1/enrollment/student`,
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

        console.log("data", data);

        setDataList(data);
      } else {
        console.log("Erro ao buscar dados do usuário");
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Header title="Inscrições" />
      <View style={styles.availableWorksContainer}>
        {dataList.map((item) => (
          <AvailableCard
            key={item.jobVacancy.id}
            onPress={() => console.log("clicou")}
            businessName={item.jobVacancy.company.name}
            title={item.jobVacancy.title}
            salary={`R$ ${item.jobVacancy.salary}`}
            location={item.jobVacancy.modality}
            source={require("../../../assets/images/companyLogo2.png")}
            status={item.status ?? "Pendente"}
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
  availableWorksContainer: {
    marginBottom: 30,
    rowGap: 20,
  },
});
