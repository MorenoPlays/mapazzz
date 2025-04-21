import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import AuthoritiesScreen from '../screens/AuthoritiesScreen';
import ClinicUpdateScreen from '../screens/ClinicUpdateScreen';
import CustomDrawerContent from '../../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {

  const [statePage, setStatePage] = React.useState("Dashboard");

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={(props) => <CustomDrawerContent {...props} setStatePage={setStatePage} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E7D32',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#2E7D32',
            width: 280,
          },
          drawerType: 'front',
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Admin - MapZzzz',
          }}
        />
         <Drawer.Screen
          name="ClinicUpdate"
          component={ClinicUpdateScreen}
          options={{
            title: 'Portal de Unidades',
          }}
        />
        <Drawer.Screen
          name="Authorities"
          component={AuthoritiesScreen}
          options={{
            title: 'Portal de Autoridade Sanitaria',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}