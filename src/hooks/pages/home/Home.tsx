import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppFonts } from "../../useAppFonts";
import Card from "./components/Card";

export default function Home() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <LinearGradient style={styles.container} colors={["#004507", "#23a331"]}>
      <Image
        source={require("../../../../assets/icon/logoEstagiou.png")}
        style={styles.logo}
      />
      <View style={styles.content}>
        <Text style={styles.textHome}>Acesse como:</Text>
        <View style={styles.cardGroup}>
          <Card
            source={require("../../../../assets/images/student.png")}
            title="Estudante"
            description="Visualize as vagas disponiveis para estágio"
          />
          <Card
            source={require("../../../../assets/images/entrepreneur.png")}
            title="Empresa"
            description="Ofereça vagas para estágio disponíveis na sua empresa"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 28,
    rowGap: 78,
  },
  content: {
    rowGap: 36,
  },
  logo: {
    width: 235,
    height: 205,
    alignSelf: "center",
  },
  textHome: {
    color: "white",
    // fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    textAlign: "left",
  },
  cardGroup: {
    rowGap: 36,
  },
});