import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Button from "../../components/button/Button";
import HeaderBack from "../../components/headerBack/HeaderBack";
import * as SecureStore from "expo-secure-store";

type RootStackParamList = {
  DetailsJobVacancy: {
    businessName: string;
    jobTitle: string;
    salary: string;
    location: string;
    source: any;
    logo: ImageSourcePropType;
    description: string;
    id: string;
    isEnroll: boolean;
  };
  BottomTab: undefined;
  BusinessVacancySubscribes: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DetailsJobVacancy"
>;

type DetailsJobVacancyRouteProp = RouteProp<
  RootStackParamList,
  "DetailsJobVacancy"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: DetailsJobVacancyRouteProp;
};

export default function DetailsJobVacancy({
  navigation,
  route,
}: Readonly<Props>) {
  const {
    id,
    businessName,
    jobTitle,
    salary,
    logo,
    location,
    description,
    isEnroll,
  } = route.params;

  const [isEnrolled, setIsEnrolled] = React.useState(isEnroll);

  async function handleSubscribe() {
    const secureToken = await SecureStore.getItemAsync("secure_token");

    await fetch(`http://10.0.2.2:8080/v1/enrollment/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secureToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobVacancyId: id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Inscrição realizada com sucesso");
          setIsEnrolled(true);
          return response.json();
        } else {
          alert("Erro ao realizar inscrição");
        }
      })
      .then((data) => {
        setIsEnrolled(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function isEnrolled() {
      const secureToken = await SecureStore.getItemAsync("secure_token");
      await fetch(`http://10.0.2.2:8080/v1/jobvacancy/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secureToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsEnrolled(data.enroll);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    isEnrolled();
  }, []);

  return (
    <>
      <HeaderBack
        title="Detalhes da vaga"
        onPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.textContainer}>
              <Text style={styles.businessName}>{businessName}</Text>
              <Text style={styles.jobTitle}>{jobTitle}</Text>
            </View>
            <Image source={logo} style={styles.logo} />
          </View>

          <View style={styles.separator} />

          {/* Seção de Remuneração com ícone */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.salaryIcon}
                source={require("../../../assets/icon/coins_white.png")}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Remuneração</Text>
              <Text style={styles.value}>{salary} /Mês</Text>
            </View>
          </View>

          {/* Seção de Localização com ícone */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.salaryIcon}
                source={require("../../../assets/icon/work_white.png")}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Localização</Text>
              <Text style={styles.value}>{location}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Seção de Descrição do estágio */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descrição do Estágio</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <Button
              text={isEnrolled ? "Inscrito" : "Inscrever-se"}
              onPress={handleSubscribe}
              disabled={isEnrolled}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  businessName: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#313131",
  },
  logo: {
    width: 88,
    height: 88,
    resizeMode: "contain",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F1F1",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#6F6F6F",
  },
  value: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "Poppins_500Medium",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    marginBottom: 8,
    color: "#3D3D3D",
  },
  descriptionText: {
    fontSize: 11,
    color: "#313131",
    fontFamily: "Poppins_400Regular",
  },
  salaryIcon: {
    width: 31,
    height: 31,
  },
  iconContainer: {
    backgroundColor: "#23A331",
    borderRadius: 30,
    padding: 15,
    marginRight: 20,
    marginTop: 10,
  },
  buttonGroup: {
    marginTop: 100,
  },
});
