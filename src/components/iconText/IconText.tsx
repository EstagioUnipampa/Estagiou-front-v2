import { Image, View, Text, StyleSheet, ImageProps } from "react-native";

export default function IconText({
  source,
  text,
}: Readonly<{ source: ImageProps; text: string }>) {
  return (
    <View style={styles.iconTextContainer}>
      <Image style={styles.icon} source={source} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#121212",
  },
});
