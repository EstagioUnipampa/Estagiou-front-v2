import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface AnnouncementDetailsProps {
  companyName: string;
  jobTitle: string;
}

const AnnouncementDetails: React.FC<AnnouncementDetailsProps> = ({ companyName, jobTitle }) => (
  <View style={styles.announcementDetailsContainer}>
    <View style={styles.jobTextContainer}>
      <Text style={styles.companyName}>{companyName}</Text>
      <Text style={styles.jobTitle}>{jobTitle}</Text>
    </View>
    <View style={styles.logoContainer}>
      <Image source={require("../../../../assets/images/companyLogo2.png")} style={styles.logo} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  announcementDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  jobTextContainer: {
    flex: 2,
  },
  companyName: {
    fontSize: 14,
    color: '#333',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default AnnouncementDetails;
