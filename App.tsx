import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function AuthPage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          {/* <Image source={require("./assets/logo.png")} style={styles.logo} /> */}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textLabel}>Acesse como:</Text>
        </View>

        <TouchableOpacity style={styles.card}>
          {/* <Image
            source={require("./assets/student.png")}
            style={styles.image}
          /> */}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>ESTUDANTE</Text>
            <Text style={styles.cardDescription}>
              Visualize as vagas disponíveis para estágio
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          {/* <Image
            source={require("./assets/empresario.png")}
            style={styles.image}
          /> */}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>EMPRESA</Text>
            <Text style={styles.cardDescription}>
              Ofereça vagas para estágio disponíveis na sua empresa
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginVertical: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  textContainer: {
    marginVertical: 16,
    paddingHorizontal: 20,
    width: "100%",
  },
  textLabel: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    fontFamily: "Poppins",
    textAlign: "left",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 14,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    color: "#1A7924",
    fontWeight: "600",
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
});
