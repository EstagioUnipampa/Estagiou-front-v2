import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ContactIconProps {
  iconName: keyof typeof Ionicons.glyphMap;
}

const ContactIcon: React.FC<ContactIconProps> = ({ iconName }) => {
  return (
    <View style={styles.iconCircle}>
      <Ionicons name={iconName} size={30} color="#23A331" /> 
    </View>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#23A331", 
  },
});

export default ContactIcon;
