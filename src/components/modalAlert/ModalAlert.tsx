import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import LoadingIcon from "../loadingIcon/LoadingIcon";

interface ModalAlertProps {
  value: boolean;
  setValue: (value: boolean) => void;
  title: string;
  description: string;
}

export default function ModalAlert({
  value,
  setValue,
  title,
  description,
}: Readonly<ModalAlertProps>) {
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <View style={styles.modalContainer}>
      <Modal transparent={true} visible={value} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setValue(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                  <View style={styles.circle} />
                  <Text style={styles.titleModal}>{title}</Text>
                </View>

                <Text style={styles.descriptionModal}>{description}</Text>
              </View>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setValue(!value)}
                activeOpacity={0.9}
              >
                <Text style={styles.textBackButton}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    padding: 20,
    backgroundColor: "#23A331",
    borderRadius: 10,
    alignItems: "center",
    rowGap: 32,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalContent: {
    rowGap: 10,
  },
  titleModal: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "left",
    color: "white",
  },
  descriptionModal: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "left",
    color: "white",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "white",
  },
  backButton: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
  textBackButton: {
    color: "#23A331",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
});
