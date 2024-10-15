import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

type IconType = 
  | "cash-outline"
  | "location-outline"
  | "time-outline";

interface InfoRowProps {
  icon: IconType; 
  title: string;
  description: string;
}

interface AnnoucementDescriptionProps {
  infoRows: InfoRowProps[];
  descriptionTitle: string;
  descriptionText: string;
}

const AnnoucementDescription: React.FC<AnnoucementDescriptionProps> = ({
  infoRows,
  descriptionTitle,
  descriptionText,
}) => {
  return (
    <View style={styles.container}>
      {infoRows.map((row, index) => (
        <View key={index} style={styles.infoRowContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={row.icon} size={24} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{row.title}</Text>
            <Text style={styles.description}>{row.description}</Text>
          </View>
        </View>
      ))}

      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionTitle}>{descriptionTitle}</Text>
        <Text style={styles.descriptionText}>{descriptionText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#23A331',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    color: '#6F6F6F',
  },
  description: {
    fontSize: 16,
    color: '#000000',
  },
  descriptionSection: {
    marginTop: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#313131',
    lineHeight: 20,
  },
});

export default AnnoucementDescription;