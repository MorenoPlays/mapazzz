// components/CustomDrawerContent.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, usePathname } from 'expo-router';
import {
  Home,
  Activity,
  Shield,
  Map,
  PieChart,
  Settings,
  LogOut,
} from 'react-native-feather';

export default function CustomDrawerContent() {
  const pathname = usePathname();

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Administração</Text>
        <Text style={styles.drawerSubtitle}>MapZzzz</Text>
      </View>

      <ScrollView style={styles.drawerItemsContainer}>
        <DrawerLink
          href="/(admin)"
          icon={<Home stroke="#fff" width={22} height={22} />}
          label="Dashboard"
          active={pathname === '/(admin)'}
        />
        <DrawerLink
          href="/(admin)/ClinicUpdate"
          icon={<Activity stroke="#fff" width={22} height={22} />}
          label="Portal de Unidades"
          active={pathname === '/(admin)/ClinicUpdate'}
        />
        <DrawerLink
          href="/(admin)/Authorities"
          icon={<Shield stroke="#fff" width={22} height={22} />}
          label="Autoridades Sanitárias"
          active={pathname === '/(admin)/Authorities'}
        />

        <View style={styles.divider} />

        <DrawerLink
          href="/Mapa"
          icon={<Map stroke="#fff" width={22} height={22} />}
          label="Mapa"
          active={pathname === '/Mapa'}
        />
        <DrawerLink
          href="/Relatorios"
          icon={<PieChart stroke="#fff" width={22} height={22} />}
          label="Relatórios"
          active={pathname === '/Relatorios'}
        />
        <DrawerLink
          href="/Configuracoes"
          icon={<Settings stroke="#fff" width={22} height={22} />}
          label="Configurações"
          active={pathname === '/Configuracoes'}
        />
      </ScrollView>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.drawerFooterItem} onPress={() => console.log('Logout')}>
          <LogOut stroke="#fff" width={22} height={22} />
          <Text style={styles.drawerItemText}>Sair de Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Subcomponente para links no drawer
function DrawerLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={[styles.drawerItem, active && styles.drawerItemActive]}>
        {icon}
        <Text style={styles.drawerItemText}>{label}</Text>
      </TouchableOpacity>
    </Link>
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
