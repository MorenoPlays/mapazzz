import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Importando as telas
import DashboardScreen from '../screens/DashboardScreen';
import ClinicUpdateScreen from '../screens/ClinicUpdateScreen';
import AuthoritiesScreen from '../screens/AuthoritiesScreen';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  
  const renderScreen = () => {
    switch(currentScreen)
    {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'ClinicUpdate':
        return <ClinicUpdateScreen />;
      case 'Authorities':
        return <AuthoritiesScreen />;
      default:
        return <DashboardScreen />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {currentScreen === 'Dashboard' && 'Dashboard Principal'}
          {currentScreen === 'ClinicUpdate' && 'Portal de Unidades de Saúde'}
          {currentScreen === 'Authorities' && 'Autoridades Sanitárias'}
        </Text>
      </View>
      
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'Dashboard' && styles.navItemActive]} 
          onPress={() => setCurrentScreen('Dashboard')}
        >
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'Contribute' && styles.navItemActive]} 
          onPress={() => setCurrentScreen('Contribute')}
        >
          <Text style={styles.navText}>Reportar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'ClinicUpdate' && styles.navItemActive]} 
          onPress={() => setCurrentScreen('ClinicUpdate')}
        >
          <Text style={styles.navText}>Clínicas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'Authorities' && styles.navItemActive]} 
          onPress={() => setCurrentScreen('Authorities')}
        >
          <Text style={styles.navText}>Autoridades</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#1B5E20',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
  }
});