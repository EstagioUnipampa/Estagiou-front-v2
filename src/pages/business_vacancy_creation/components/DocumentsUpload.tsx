import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importando o Ionicons

const DocumentsUpload = () => {
  const [documents, setDocuments] = useState([]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTitle}>Adicionar Documentos</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Ionicons name="cloud-upload-outline" size={24} color="#1A7924" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#BBBBBB",
    backgroundColor: "white",
    height: 64,
    borderWidth: 1,
    borderRadius: 50,
    borderStyle: "dashed",
    paddingRight: 29,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerTitle: {
    color: "#848484",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  addButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center", 
  },
  documentsContainer: {
    paddingVertical: 12,
  },
  documentItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  documentName: {
    fontSize: 14,
  },
});

export default DocumentsUpload;
