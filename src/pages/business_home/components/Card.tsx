import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAppFonts } from "../../../hooks/useAppFonts";
import LoadingIcon from "../../../components/loadingIcon/LoadingIcon";
import { useNavigation } from "@react-navigation/native";

interface CardProps {
  source: any;
  number: number;
  text: string;
  onPress: () => void;
}

export default function Card({ source, number, text, onPress }: Readonly<CardProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <TouchableOpacity>
      <View style={styles.registrations}>
        <View style={styles.containerText}>
          <Text style={styles.numberRegistrations}>{number}</Text>
          <Text style={styles.textRegistrations}>{text}</Text>
        </View>
        <Image style={styles.confirmedImage} source={source} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  registrations: {
    backgroundColor: "#1A7924",
    width: "90%",
    margin: 20,
    borderRadius: 20,
    paddingStart: 28,
    paddingEnd: 28,
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerText: {},
  numberRegistrations: {
    marginStart: 3,
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 34,
    lineHeight: 41,
  },
  textRegistrations: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  confirmedImage: {
    width: 45,
    height: 45,
  },
});
