import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import LoadingIcon from "../loadingIcon/LoadingIcon";

interface HeaderProps {
  title: string;
  onPress: () => void;
}

export default function HeaderBack({ title, onPress }: Readonly<HeaderProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications} />
      <View style={styles.headerContent}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Image source={require("../../../assets/icon/btnBack.png")} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23A331",
    width: "100%",
  },
  notifications: {
    height: StatusBar.currentHeight,
    backgroundColor: "#23A331",
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 31,
    padding: 28,
  },
  textHeader: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
});
