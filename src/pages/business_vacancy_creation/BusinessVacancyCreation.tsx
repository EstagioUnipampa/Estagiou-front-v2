import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import HeaderBack from "../../components/headerBack/HeaderBack";
import InputText from "../../components/inputText/InputText";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import CreateJobVacancyButtonProps from "../business_home/components/CreateJobVacancyButton";
import DocumentsUpload from "./components/DocumentsUpload";
import { Picker } from '@react-native-picker/picker';

type RootStackParamList = {
  BusinessVacancyCreation: undefined;
  BusinessHome: undefined;
};

type BusinessVacancyCreationNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BusinessVacancyCreation"
>;

type Props = {
  navigation: BusinessVacancyCreationNavigationProp;
};

export default function BusinessVacancyCreation({
  navigation,
}: Readonly<Props>) {
  const fontsLoaded = useAppFonts();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [location, setLocation] = useState("Presencial"); 

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderBack
          title="Criar Nova Vaga"
          onPress={() => navigation.navigate("BusinessHome")}
        />
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.titleText}>
              Adicione as Informações da Vaga
            </Text>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formFields}>
              <Text style={styles.inputTitle}>Nome da Vaga</Text>
              <InputText placeholder="" onChange={() => {}} />
              
              <Text style={styles.inputTitle}>Remuneração</Text>
              <InputText placeholder="" onChange={() => {}} />
              
              <Text style={styles.inputTitle}>Localização</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={location}
                  style={styles.picker}
                  onValueChange={(itemValue) => setLocation(itemValue)}
                >
                  <Picker.Item label="Presencial" value="Presencial" />
                  <Picker.Item label="Remoto" value="Remoto" />
                </Picker>
              </View>

              <Text style={styles.inputTitle}>Descrição</Text>
              <InputText
                placeholder="Adicione na descrição os documentos que o candidato deve enviar."
                onChange={() => {}}
                multiline={true}
              />
              <Text style={styles.inputTitle}>Documentos</Text>
              <DocumentsUpload />
            </View>
            <CreateJobVacancyButtonProps
              text="Criar nova vaga"
              onPress={() => navigation.navigate("BusinessVacancyCreation")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF6FF",
  },
  content: {
    paddingTop: 15,
    paddingStart: 30,
    paddingEnd: 30,
  },
  textContent: {
    rowGap: 6,
  },
  titleText: {
    color: "#212121",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  inputTitle: {
    color: "#585858",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textAlign: "left",
  },
  formGroup: {
    marginTop: 20,
    rowGap: 31,
  },
  formFields: {
    rowGap: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pickerContainer: {
    borderColor: "#1A7924",
    backgroundColor: "white",
    height: 64, 
    borderWidth: 1,
    borderRadius: 50,
    paddingRight: 29,
    overflow: "hidden", 
  },
  picker: {
    height: "100%", 
    width: '100%', 
    backgroundColor: 'transparent', 
  },
});
