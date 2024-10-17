import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppBar: React.FC = () => {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>Perfil</Text>
      <TouchableOpacity style={styles.ellipsisContainer}>
        <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 65,
    backgroundColor: '#23A331', 
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
  },
  appBarTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1, 
    textAlign: 'center', 
    marginTop: 40,
    marginLeft: 27,
  },
  ellipsisContainer: {
    marginTop: 40,
  },
});

export default AppBar;
