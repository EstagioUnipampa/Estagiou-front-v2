import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../../components/header/Header";
import DocumentCard from "./components/DocumentCard";

export default function StudentDocuments() {
  return (
    <ScrollView style={styles.container}>
      <Header title="Documentos" />

      <DocumentCard
        businessName="Nome da empresa"
        title="Desenvolvimento de Sistemas"
        description="Documentação"
        source={require("../../../assets/images/companyLogo2.png")}
      />
      <DocumentCard
        businessName="Nome da empresa"
        title="Desenvolvimento de Sistemas"
        description="Documentação"
        source={require("../../../assets/images/companyLogo1.png")}
      />
      <DocumentCard
        businessName="Nome da empresa"
        title="Desenvolvimento de Sistemas"
        description="Documentação"
        source={require("../../../assets/images/companyLogo2.png")}
      />
      <DocumentCard
        businessName="Nome da empresa"
        title="Desenvolvimento de Sistemas"
        description="Documentação"
        source={require("../../../assets/images/companyLogo1.png")}
      />
      <DocumentCard
        businessName="Nome da empresa"
        title="Desenvolvimento de Sistemas"
        description="Documentação"
        source={require("../../../assets/images/companyLogo2.png")}
      />
      <DocumentCard
        businessName="Nome da empresa"
        title="Desenvolvimento de Sistemas"
        description="Documentação"
        source={require("../../../assets/images/companyLogo1.png")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF6FF",
  },
});
