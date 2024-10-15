import React from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar, View } from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import LoadingIcon from "../loadingIcon/LoadingIcon";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: Readonly<HeaderProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications} />
      <View style={styles.headerContent}>
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
    justifyContent: "center",
    columnGap: 31,
    paddingBottom: 27,
    paddingTop: 34,
  },
  textHeader: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
});
