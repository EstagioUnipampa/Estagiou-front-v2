import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import SearchInput from "../../components/searchInput/SearchInput";
import { useAppFonts } from "../../hooks/useAppFonts";
import AvailableCard from "./components/AvailableCard";
import Card from "./components/Card";
import CreateJobVacancyButtonProps from "./components/CreateJobVacancyButton";

type RootStackParamList = {
  BusinessHome: undefined;
  BusinessVacancy: undefined;
  BusinessVacancyCreation: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BusinessHome"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function BusinessHome({ navigation }: Readonly<Props>) {
  const fontsLoaded = useAppFonts();

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
  const isFocused = useIsFocused();

  async function fetchUserData() {
    try {
      const secureToken = await SecureStore.getItemAsync("secure_token");

      const response = await fetch(`http://10.0.2.2:8080/v1/company/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secureToken}`,
          "Content-Type": "application/json",
        },
      });

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
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderText}>
            <Text style={styles.welcome}>Bem-vindo</Text>
            <Text style={styles.name}>{userData.name}</Text>
          </View>

          <Image
            style={styles.userIcon}
            source={require("../../../assets/images/userIcon.png")}
          />
        </View>
        <View style={styles.searchInput}>
          <SearchInput
            placeholder="Pesquise vagas aqui"
            onChange={() => console.log("clicou")}
          />
        </View>
      </SafeAreaView>

      <Card
        number={userData.jobVacancies}
        text="Vagas Criadas"
        source={require("../../../assets/images/confirmed.png")}
        onPress={() => console.log("clicou")}
      />

      <CreateJobVacancyButtonProps
        text="Criar nova vaga"
        onPress={() => navigation.navigate("BusinessVacancyCreation")}
      />

      <View style={styles.availableWorksHeader}>
        <Text style={styles.availableWorksHeaderTitle}>Vagas Disponíveis</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.avallableWorksMore}>Mais</Text>
        </TouchableOpacity>
      </View>

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
  content: {
    backgroundColor: "#23A331",
  },
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 27,
    paddingStart: 30,
    paddingEnd: 30,
    paddingBottom: 31,
  },
  containerHeaderText: {},
  welcome: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "white",
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "white",
  },
  userIcon: {
    width: 46,
    height: 46,
    borderRadius: 28,
  },
  searchInput: {
    display: "flex",
    alignItems: "center",
    paddingStart: 30,
    paddingEnd: 30,
    paddingBottom: 25,
  },
  recommendedWorksHeader: {
    paddingStart: 30,
    paddingEnd: 30,
    paddingBottom: 22,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  recommendedWorksHeaderTitle: {
    color: "#3D3D3D",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  indexesRecommendedWorks: {
    display: "flex",
    flexDirection: "row",
    columnGap: 6,
  },
  availableWorksHeader: {
    marginTop: 10,
    marginBottom: 34,
    paddingStart: 30,
    paddingEnd: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  availableWorksHeaderTitle: {
    color: "#3D3D3D",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  avallableWorksMore: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  availableWorksContainer: {
    marginBottom: 30,
    rowGap: 20,
  },
});
