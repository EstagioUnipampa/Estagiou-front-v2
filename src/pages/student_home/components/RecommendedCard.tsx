import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

interface RecommendedCardProps {
  source: any;
  title: string;
  location: string;
  salary: string;
  onPress: () => void;
}

export default function RecommendedCard({
  source,
  title,
  location,
  salary,
  onPress,
}: Readonly<RecommendedCardProps>) {
  return (
    <TouchableOpacity
      style={styles.recommendedWorksContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.recommendedWorksContent}>
        <View style={styles.recommendedWorksCard}>
          <Image source={source} style={styles.companyLogo} />
          <View style={styles.recommendedWorksDescription}>
            <Text style={styles.recommendedWorksTitle}>{title}</Text>
            <Text style={styles.recommendedWorksLocation}>{location}</Text>
            <View style={styles.salaryContainer}>
              <Image
                style={styles.salaryIcon}
                source={require("../../../../assets/icon/coins.png")}
              />
              <Text style={styles.salary}>{salary}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recommendedWorksContainer: {
    paddingStart: 30,
    rowGap: 20,
  },
  recommendedWorksContent: {},
  recommendedWorksCard: {
    backgroundColor: "white",
    width: 283,
    height: 109,
    borderRadius: 20,
    padding: 14,
    display: "flex",
    flexDirection: "row",
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  recommendedWorksDescription: {
    rowGap: 6,
  },
  recommendedWorksTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#212121",
    marginStart: 9,
  },
  recommendedWorksLocation: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#212121",
    marginStart: 20,
  },
  salaryIcon: {
    width: 20,
    height: 22,
  },
  salary: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#121212",
  },
  salaryContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 7,
    marginStart: 20,
  },
});
