import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AppNavigator from '../app/navigation/AppNavigator';
import { 
  Home, 
  BarChart2, 
  Map, 
  PieChart, 
  Settings, 
  LogOut, 
  AlertTriangle, 
  Activity, 
  Shield 
} from 'react-native-feather';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Administração</Text>
        <Text style={styles.drawerSubtitle}>MapZzzz</Text>
      </View>
      
      <ScrollView style={styles.drawerItemsContainer}>
        <TouchableOpacity
          style={[styles.drawerItem, props.state.index === 0 && styles.drawerItemActive]}
          onPress={() => props.navigation.navigate('Dashboard')}
        >
          <Home stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Dashboard</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={[styles.drawerItem, props.state.index === 2 && styles.drawerItemActive]}
          onPress={() => props.navigation.navigate('ClinicUpdate')}
        >
          <Activity stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Portal de Unidades</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.drawerItem, props.state.index === 3 && styles.drawerItemActive]}
          onPress={() => props.navigation.navigate('Authorities')}
        >
          <Shield stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Autoridades Sanitárias</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.drawerItem}>
          <Map stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Mapa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawerItem}>
          <PieChart stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Relatórios</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawerItem}>
          <Settings stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Configurações</Text>
        </TouchableOpacity>

        
      </ScrollView>
      
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.drawerFooterItem}>
          <LogOut stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Sair de Admin</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1B5E20',
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  drawerItemsContainer: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  drawerItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});