import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileInfoProps {
  name: string;
  course: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, course }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userCourse}>{course}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userCourse: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileInfo;
