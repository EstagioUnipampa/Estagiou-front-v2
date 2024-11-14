import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageProps,
  TouchableOpacity,
} from "react-native";

interface BusinessVacancyProps {
  businessName: string;
  vacancy: string;
  source: ImageProps;
  onPress: () => void;
}

export default function BusinessVacancyCard({
  businessName,
  vacancy,
  source,
  onPress,
}: Readonly<BusinessVacancyProps>) {
  return (
    <TouchableOpacity style={styles.subscribeWorkCard} onPress={onPress}>
      <Image style={styles.subscribeWorkCardImage} source={source} />
      <View style={styles.subscribeWorkCardDescription}>
        <Text style={styles.subscribeWorkCardBusinessName}>{businessName}</Text>
        <Text style={styles.subscribeWorkCardVacancy}>{vacancy}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  subscribeWorksHeader: {
    marginTop: 45,
    marginBottom: 34,
    paddingStart: 30,
    paddingEnd: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subscribeWorksHeaderTitle: {
    color: "#3D3D3D",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  avallableWorksMore: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  subscribeWorkCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingStart: 28,
    paddingTop: 20,
    paddingBottom: 23,
    columnGap: 19,
    display: "flex",
    flexDirection: "row",
  },
  subscribeWorkCardImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  subscribeWorkCardDescription: {},
  subscribeWorkCardBusinessName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#212121",
    marginBottom: 6,
  },
  subscribeWorkCardVacancy: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#212121",
    marginBottom: 6,
  },
});
