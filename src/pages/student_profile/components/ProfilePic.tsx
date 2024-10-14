import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfilePic: React.FC = () => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={70} color="#23A331" /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 90,
    height: 90,
    backgroundColor: '#E0E0E0',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default ProfilePic;
