import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
const BottomNavBar: React.FC = () => (
  <View style={styles.bottomNavBar}>
    <TouchableOpacity style={styles.bookmarkButton}>
      <Ionicons name="bookmark-outline" size={24} color="green" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.applyButton}>
      <Text style={styles.applyButtonText}>INSCREVA-SE</Text>
    </TouchableOpacity>
  </View>
);

export default BottomNavBar;

const styles = StyleSheet.create({
  bottomNavBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  bookmarkButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#23A331',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
