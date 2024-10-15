import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AnnouncementDetails from './components/AnnouncementDetails';
import BottomNavBar from './components/BottomNavBar';
import AnnoucementDescription from './components/AnnoucementDescription';

interface InfoRowProps {
  icon: "cash-outline" | "location-outline";
  title: string;
  description: string;
}

const InternshipDetails: React.FC = () => {
  const infoRows: InfoRowProps[] = [
    { icon: 'cash-outline', title: 'Remuneração', description: 'R$740,00/Mês' },
    { icon: 'location-outline', title: 'Localização', description: 'Alegrete - RS (Presencial)' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detalhes</Text>
      </View>

      <ScrollView>
        <AnnouncementDetails companyName="Empresa XYZ" jobTitle="Estágio em Desenvolvimento" />
        
        <AnnoucementDescription
          infoRows={infoRows}
          descriptionTitle="Descrição do Estágio"
          descriptionText="Atuar no desenvolvimento de sistemas internos, colaborar com a equipe de desenvolvimento em diversas etapas de projetos e auxiliar na manutenção de software."
        />
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    backgroundColor: '#23A331',
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default InternshipDetails;
