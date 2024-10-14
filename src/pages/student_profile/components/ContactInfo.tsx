import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContactIcon from './ContactIcon';

const ContactInfo: React.FC = () => {
  return (
    <View style={styles.contactContainer}>
      <ContactIcon iconName="call-outline" />
      <View style={styles.spaceBetweenIcons} />
      <ContactIcon iconName="mail-outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  spaceBetweenIcons: {
    width: 20,
  },
});

export default ContactInfo;
