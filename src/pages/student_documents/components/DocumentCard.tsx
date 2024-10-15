import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageProps,
  TouchableOpacity,
} from "react-native";
import IconText from "../../../components/iconText/IconText";

interface DocumentCardProps {
  businessName: string;
  title: string;
  description: string;
  source: ImageProps;
}

export default function DocumentCard({
  businessName,
  title,
  description,
  source,
}: Readonly<DocumentCardProps>) {
  return (
    <TouchableOpacity style={styles.documentCard} activeOpacity={0.7}>
      <Image style={styles.documentCardImage} source={source} />
      <View style={styles.documentCardDescription}>
        <Text style={styles.documentCardBusinessName}>{businessName}</Text>
        <Text style={styles.documentCardTitle}>{title}</Text>
        <View style={styles.documentCardIcons}>
          <IconText
            text={description}
            source={require("../../../../assets/icon/document.png")}
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
  documentCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingStart: 28,
    paddingTop: 20,
    paddingBottom: 23,
    columnGap: 19,
    display: "flex",
    flexDirection: "row",
  },
  documentCardImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },
  documentCardDescription: {},
  documentCardBusinessName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#212121",
    marginBottom: 3,
  },
  documentCardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#212121",
    marginBottom: 6,
  },
  documentCardIcons: {
    rowGap: 6,
  },
});
