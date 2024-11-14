import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

 
const Status = () => {
  const handleApprove = () => {
    console.log("Aprovado!");
  };

  const handleReject = () => {
    console.log("Rejeitado!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Aprovar" color="#4CAF50" onPress={handleApprove} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Rejeitar" color="#F44336" onPress={handleReject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 100,
    marginVertical: 5, 
  },
});

export default Status;


