import React from "react";
import { View, StyleSheet } from "react-native";
import ContactIcon from "./ContactIcon";

const ContactInfo: React.FC = () => {
  return (
    <View style={styles.contactContainer}>
      <ContactIcon iconName="call" />
      <View style={styles.spaceBetweenIcons} />
      <ContactIcon iconName="mail" />
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    position: "absolute",
    top: 280,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  spaceBetweenIcons: {
    width: 20,
  },
});

export default ContactInfo;
