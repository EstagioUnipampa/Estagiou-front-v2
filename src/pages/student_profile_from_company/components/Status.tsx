import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

interface StatusProps {
  onApprove: () => void;
  onReject: () => void;
  isDecided: boolean;
}

const Status = ({ onApprove, onReject, isDecided }: Readonly<StatusProps>) => {
  if (isDecided) {
    return (
      <View>
        <Text>Decidido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Aprovar" color="#4CAF50" onPress={onApprove} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Rejeitar" color="#F44336" onPress={onReject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 100,
    marginVertical: 5,
  },
});

export default Status;
