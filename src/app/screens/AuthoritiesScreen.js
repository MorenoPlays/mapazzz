import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  FlatList,
  Modal
} from 'react-native';
import { Search, Filter, Eye, CheckCircle, AlertTriangle, Clock, X } from 'react-native-feather';
import { Picker } from '@react-native-picker/picker';

export default function AuthoritiesScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [zones, setZones] = useState([
    { 
      id: 1, 
      name: 'Bairro Morro Bento',
      address: 'Rua 21, Zona Sul',
      cases: 45,
      status: 'Risco Alto',
      lastUpdated: '15/01/2025',
      inspected: true,
      description: 'Área com água parada após chuvas recentes. Vários casos reportados nas últimas semanas. População precisa de orientação sobre medidas preventivas.'
    },
    { 
      id: 2, 
      name: 'Bairro Nova Vida',
      address: 'Próximo ao mercado',
      cases: 32,
      status: 'Em Observação',
      lastUpdated: '14/01/2025',
      inspected: true,
      description: 'Área com casos crescentes. Já foi realizada inspeção e recomenda-se monitoramento contínuo. População está sendo orientada sobre medidas preventivas.'
    },
    { 
      id: 3, 
      name: 'Golfe 2',
      address: 'Avenida Principal',
      cases: 18,
      status: 'Resolvido',
      lastUpdated: '10/01/2025',
      inspected: true,
      description: 'Área estava com surto controlado após pulverização e drenagem de águas paradas. Recomenda-se monitoramento periódico para evitar novos focos.'
    },
    { 
      id: 4, 
      name: 'Talatona',
      address: 'Próximo ao centro comercial',
      cases: 7,
      status: 'Baixo Risco',
      lastUpdated: '12/01/2025',
      inspected: false,
      description: 'Poucos casos reportados, mas é necessário inspeção para avaliar condições da área. Não há informações sobre possíveis focos de mosquitos.'
    },
    { 
      id: 5, 
      name: 'Benfica',
      address: 'Zona residencial',
      cases: 24,
      status: 'Não Avaliado',
      lastUpdated: '08/01/2025',
      inspected: false,
      description: 'Zona com casos reportados recentemente. Precisa de inspeção urgente para avaliação das condições e possíveis focos de mosquitos.'
    },
  ]);
  
  const [selectedZone, setSelectedZone] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');
  
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };
  
  const handleUpdateStatus = () => {
    if (!updateStatus) {
      Alert.alert('Erro', 'Por favor, selecione um status');
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de atualização
    setTimeout(() => {
      setIsLoading(false);
      
      const updatedZones = zones.map(zone => {
        if (zone.id === selectedZone.id) {
          return {
            ...zone,
            status: updateStatus,
            inspected: true,
            description: updateNotes || zone.description
          };
        }
        return zone;
      });
      
      setZones(updatedZones);
      setModalVisible(false);
      setUpdateStatus('');
      setUpdateNotes('');
      
      Alert.alert('Sucesso', 'Status da zona atualizado com sucesso!');
    }, 1500);
  };
  
  const filteredZones = zones.filter(zone => {
    // Filtro por status
    const statusMatch = filterStatus === 'Todos' || zone.status === filterStatus;
    
    // Filtro por pesquisa
    const searchMatch = zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       zone.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Risco Alto': return '#e53935';
      case 'Em Observação': return '#fb8c00';
      case 'Resolvido': return '#43a047';
      case 'Baixo Risco': return '#8bc34a';
      case 'Não Avaliado': return '#9e9e9e';
      default: return '#666';
    }
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Risco Alto': return <AlertTriangle width={16} height={16} stroke="#fff" />;
      case 'Em Observação': return <Clock width={16} height={16} stroke="#fff" />;
      case 'Resolvido': return <CheckCircle width={16} height={16} stroke="#fff" />;
      case 'Baixo Risco': return <CheckCircle width={16} height={16} stroke="#fff" />;
      case 'Não Avaliado': return <Eye width={16} height={16} stroke="#fff" />;
      default: return null;
    }
  };
  
  if (!isLoggedIn) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <AlertTriangle width={24} height={24} stroke="#e53935" />
          <Text style={styles.headerTitle}>Portal da Autoridade Sanitária</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Login</Text>
          <Text style={styles.formSubtitle}>
            Acesse para gerenciar e classificar zonas de risco de malária
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.gov.ao"
              keyboardType="email-address"
              autoCapitalize="none"
              value={loginData.email}
              onChangeText={(text) => setLoginData({...loginData, email: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              secureTextEntry
              value={loginData.password}
              onChangeText={(text) => setLoginData({...loginData, password: text})}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
          
          <Text style={styles.noteText}>
            * Apenas funcionários autorizados da Autoridade Sanitária têm acesso a esta área.
          </Text>
        </View>
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle width={24} height={24} stroke="#e53935" />
        <Text style={styles.headerTitle}>Gestão de Zonas de Risco</Text>
      </View>
      
      <View style={styles.filterSection}>
        <View style={styles.searchContainer}>
          <Search width={20} height={20} stroke="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar zonas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <Filter width={20} height={20} stroke="#666" style={styles.filterIcon} />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filterStatus}
              onValueChange={(itemValue) => setFilterStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Todos" value="Todos" />
              <Picker.Item label="Risco Alto" value="Risco Alto" />
              <Picker.Item label="Em Observação" value="Em Observação" />
              <Picker.Item label="Resolvido" value="Resolvido" />
              <Picker.Item label="Baixo Risco" value="Baixo Risco" />
              <Picker.Item label="Não Avaliado" value="Não Avaliado" />
            </Picker>
          </View>
        </View>
      </View>
      
      <FlatList
        data={filteredZones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.zoneCard}
            onPress={() => {
              setSelectedZone(item);
              setModalVisible(true);
              setUpdateStatus(item.status);
              setUpdateNotes(item.description);
            }}
          >
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneName}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                {getStatusIcon(item.status)}
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.zoneAddress}>{item.address}</Text>
            
            <View style={styles.zoneInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Casos:</Text>
                <Text style={styles.infoValue}>{item.cases}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Atualizado:</Text>
                <Text style={styles.infoValue}>{item.lastUpdated}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Inspecionado:</Text>
                <Text style={styles.infoValue}>{item.inspected ? 'Sim' : 'Não'}</Text>
              </View>
            </View>
            
            <Text numberOfLines={2} style={styles.zoneDescription}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Atualizar Zona</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X width={24} height={24} stroke="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedZone && (
              <>
                <Text style={styles.modalZoneName}>{selectedZone.name}</Text>
                <Text style={styles.modalZoneAddress}>{selectedZone.address}</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Status de Risco</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={updateStatus}
                      onValueChange={(itemValue) => setUpdateStatus(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Risco Alto" value="Risco Alto" />
                      <Picker.Item label="Em Observação" value="Em Observação" />
                      <Picker.Item label="Resolvido" value="Resolvido" />
                      <Picker.Item label="Baixo Risco" value="Baixo Risco" />
                      <Picker.Item label="Não Avaliado" value="Não Avaliado" />
                    </Picker>
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Observações</Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Informações sobre a inspeção e situação atual..."
                    multiline={true}
                    numberOfLines={4}
                    value={updateNotes}
                    onChangeText={setUpdateNotes}
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleUpdateStatus}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Atualizar Status</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    marginTop: 16,
    fontStyle: 'italic',
  },
  filterSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 8,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Adiciona espaço para o botão de logout
  },
  zoneCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  zoneAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  zoneInfo: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  zoneDescription: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e53935',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalZoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalZoneAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});