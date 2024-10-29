import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppFonts } from "../../../hooks/useAppFonts";
import LoadingIcon from "../../../components/loadingIcon/LoadingIcon";

interface CreateJobVacancyButtonProps {
  text: string;
}

export default function CreateJobVacancyButton({
  text,
}: Readonly<CreateJobVacancyButtonProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <TouchableOpacity style={styles.button}>
      <Image
        style={styles.image}
        source={require("../../../../assets/icon/plus.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    margin: 20,
    borderRadius: 50,
    paddingStart: 19,
    paddingEnd: 19,
    paddingTop: 19,
    paddingBottom: 19,
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    borderWidth: 1,
    borderColor: "#E1D3FF",
  },
  image: {
    width: 28,
    height: 28,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 19,
  },
  text: {
    color: "#212121",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
});
