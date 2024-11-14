import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import Header from "../../components/header/Header";
import SubscribeCard from "./components/SubscribeCard";
import AvailableCard from "../business_home/components/AvailableCard";

export default function StudentRegistrations() {
  type JobVacancyList = {
    id: string;
    title: string;
    salary: string;
    modality: string;
  };

  const [dataList, setDataList] = useState<JobVacancyList[]>([]);

  const [userData, setUserData] = useState({
    name: "",
    jobVacancies: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");

        const response = await fetch(
          `http://10.0.2.2:8080/v1/company/profile`,
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

          setUserData({
            name: data.name,
            jobVacancies: data.jobVacancies?.length || 0,
          });
          setDataList(data.jobVacancies);
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

  return (
    <ScrollView style={styles.container}>
      <Header title="Inscrições" />
      <View style={styles.availableWorksContainer}>
        {dataList.map((item) => (
          <AvailableCard
            key={item.id}
            onPress={() => console.log("clicou")}
            businessName={userData.name}
            title={item.title}
            salary={`R$ ${item.salary}`}
            location={item.modality}
            source={require("../../../assets/images/companyLogo2.png")}
          ></AvailableCard>
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
