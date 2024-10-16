import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileInfoProps {
  name: string;
  email: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, email }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileInfo;
