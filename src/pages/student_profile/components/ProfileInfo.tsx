import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileInfoProps {
  name: string;
  lastName: string;
  email: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, lastName, email }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userLastName}>{lastName}</Text>
      </View>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    top: 180,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
  },
  userLastName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProfileInfo;
