// app/(admin)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../components/CustomDrawerContent'; // Importa o conteúdo customizado


export default function AdminLayout() {
  return (
    <Drawer
    drawerContent={() => <CustomDrawerContent />} // Usa o conteúdo customizado no drawer
    screenOptions={{
      headerStyle: { backgroundColor: '#2E7D32' },
      headerTintColor: '#fff',
      drawerStyle: { backgroundColor: '#2E7D32', width: 280 },
      drawerType: 'front',
      }}
    />
  );
}