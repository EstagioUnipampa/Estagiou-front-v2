import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LoadingIcon from "../../../components/loadingIcon/LoadingIcon";
import { useAppFonts } from "../../../hooks/useAppFonts";
import { Ionicons } from "@expo/vector-icons";

interface IconTextProps {
  topic: string;
  topicContent: string;
  iconName: keyof typeof Ionicons.glyphMap;
  marginTop?: number;
}

export default function IconText({
  topic,
  topicContent,
  iconName,
  marginTop,
}: Readonly<IconTextProps>) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <View style={{ marginTop: marginTop }}>
      <View style={styles.container}>
        <View style={styles.borderIcon}>
          <Ionicons name={iconName} size={28} color="#23A331" />
        </View>
        <View>
          <Text style={styles.topic}>{topic}</Text>
          <Text style={styles.topicContent}>{topicContent}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  borderIcon: {
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1D3FF",
    borderWidth: 1,
    marginRight: 21,
  },
  topic: {
    fontFamily: "Poppins_400Regular",
    color: "#6F6F6F",
    fontSize: 14,
  },
  topicContent: {
    fontFamily: "Poppins_500Medium",
    color: "#000000",
    fontSize: 16,
  },
});
