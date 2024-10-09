import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardProps {
  source: any;
  title: string;
  description: string;
}

export default function Card({
  source,
  title,
  description,
}: Readonly<CardProps>) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log(title)}
      activeOpacity={0.7}
    >
      <Image source={source} style={styles.icon} />
      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 117,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 29,
    display: "flex",
    flexDirection: "row",
    columnGap: 28,
  },
  icon: {
    height: 60,
    width: 60,
  },
  title: {
    fontSize: 16,
    color: "#1A7924",
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "Poppins_400Regular",
  },
  textContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    rowGap: 12,
  },
});
