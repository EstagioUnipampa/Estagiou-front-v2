import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppFonts } from "../../hooks/useAppFonts";
import Card from "./components/Card";
import SearchInput from "../../components/searchInput/SearchInput";

export default function StudentHome() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderText}>
            <Text style={styles.welcome}>Bem-vindo</Text>
            <Text style={styles.name}>Henry Kanwil</Text>
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
        number={29}
        text="Incrições"
        source={require("../../../assets/images/confirmed.png")}
      />
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
});
