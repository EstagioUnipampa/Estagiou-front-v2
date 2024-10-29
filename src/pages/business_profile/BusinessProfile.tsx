import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import { useAppFonts } from "../../hooks/useAppFonts";
import * as SecureStore from "expo-secure-store";
import IconText from "./components/IconText";

export default function BusinessProfile() {
  const [userData, setUserData] = useState({
    name: "",
    address: {
      country: "",
      state: "",
      city: "",
    },
  });

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
          setUserData({
            name: data.name || "",
            address: {
              city: data.address.city || "",
              state: data.address.state || "",
              country: data.address.country || "",
            },
          });
        } else {
          console.log("Erro ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro: ", error);
      } finally {
      }
    };

    fetchUserData();
  }, []);

  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.header}
          source={require("../../../assets/images/header.png")}
        >
          <Image
            style={styles.overlayImage}
            source={require("../../../assets/images/companyLogo3.png")}
          />
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.address}>
            {userData.address.country}, {userData.address.state},
            {" " + userData.address.city}
          </Text>

          <View style={styles.line} />

          <IconText
            iconName="mail"
            topic="Email"
            topicContent="highspeedst@mail.com"
            marginTop={20}
          />

          <IconText
            iconName="person"
            topic="Responsável"
            topicContent="Lorem Ipsum"
            marginTop={15}
          />

          <Text style={styles.about}>Sobre a empresa</Text>

          <Text style={styles.aboutContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <Text style={styles.aboutContent}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    backgroundColor: "#FBF6FF",
    paddingBottom: 40,
  },
  header: {
    height: 247,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImage: {
    height: 88,
    width: 88,
    marginTop: 230,
    marginRight: 260,
  },
  content: {
    marginTop: 67,
    marginStart: 27,
    marginEnd: 27,
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#313131",
  },
  address: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#000000",
    marginTop: 5,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#F1F1F1",
    marginTop: 20,
  },
  about: {
    marginTop: 35,
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#3D3D3D",
  },
  aboutContent: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#313131",
  },
});
