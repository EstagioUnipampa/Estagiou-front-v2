import { View, Image, Text, StyleSheet, ImageProps, TouchableOpacity } from "react-native";
import IconText from "../../../components/iconText/IconText";

interface AvailableCardProps {
  businessName: string;
  title: string;
  salary: string;
  location: string;
  source: ImageProps;
  onPress: () => void;
}

export default function AvailableCard({
  businessName,
  title,
  salary,
  location,
  source,
  onPress,
}: Readonly<AvailableCardProps>) {
  return (
    <TouchableOpacity style={styles.availableWorkCard} onPress={onPress}>
      <Image style={styles.availableWorkCardImage} source={source} />
      <View style={styles.availableWorkCardDescription}>
        <Text style={styles.availableWorkCardBusinessName}>{businessName}</Text>
        <Text style={styles.availableWorkCardTitle}>{title}</Text>
        <View style={styles.availableWorkCardIcons}>
          <IconText
            text={salary}
            source={require("../../../../assets/icon/coins.png")}
          />
          <IconText
            text={location}
            source={require("../../../../assets/icon/work.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  availableWorksHeader: {
    marginTop: 45,
    marginBottom: 34,
    paddingStart: 30,
    paddingEnd: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  availableWorksHeaderTitle: {
    color: "#3D3D3D",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  avallableWorksMore: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  availableWorkCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingStart: 28,
    paddingTop: 20,
    paddingBottom: 23,
    columnGap: 19,
    display: "flex",
    flexDirection: "row",
  },
  availableWorkCardImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  availableWorkCardDescription: {},
  availableWorkCardBusinessName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#212121",
    marginBottom: 6,
  },
  availableWorkCardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#212121",
    marginBottom: 6,
  },
  availableWorkCardIcons: {
    rowGap: 6,
  },
});
