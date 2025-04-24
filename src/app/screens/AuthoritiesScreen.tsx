import React, { useState, useEffect } from 'react';
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
  Modal,
  Image,
  Dimensions
} from 'react-native';
import { Search, Filter, Eye, CheckCircle, AlertTriangle, Clock, X } from 'react-native-feather';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function AuthoritiesScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Verificar token no AsyncStorage
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('BearerToken');
      if (storedToken) {
        setToken(storedToken);
        console.log('Token encontrado:', storedToken);
      } else {
        console.log('Token não encontrado!');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
    }
  };

  // Armazenar token no AsyncStorage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('BearerToken', token);
      setToken(token);
      console.log('Token armazenado com sucesso');
    } catch (error) {
      console.error('Erro ao armazenar o token:', error);
    }
  };

  // Função de login
  const login = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api-mapazzz.onrender.com/login_as", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telefone, password })
      });
      const result = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        Alert.alert("Erro", result.message || "Erro ao tentar logar");
      } else {
        await storeToken(result.token);
        setIsLoading(false);
        setIsLoggedIn(true);
        fetchDataAndCreateCircles(); // Carregar zonas após login
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", error.message);
    }
  };

  // Buscar contagem de confirmações para uma área de risco
  const fetchConfirmationCount = async (ariaDeRiscoId) => {
    try {
      const response = await fetch(
        `https://api-mapazzz.onrender.com/buscar_analise_total?ariaDeRisco=${ariaDeRiscoId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Erro ao acessar a API.");
      const data = await response.json();
      return data.confirmationCount;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return 0;
    }
  };

  // Buscar zonas de risco validadas
  const fetchDataAndCreateCircles = async () => {
    try {
      const response = await fetch(
        "https://api-mapazzz.onrender.com/buscar_aria_de_risco",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Erro ao acessar a API.");
      const data = await response.json();
      const updatedLocations = await Promise.all(
        data.map(async (location) => {
          const confirmationCount = await fetchConfirmationCount(location.id);
          return { ...location, confirmationCount };
        })
      );
      setLocations(updatedLocations);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Validar área de risco
  const handleConfirmarRisco = async (ariaDeRisco) => {
    try {
      const res = await fetch("https://api-mapazzz.onrender.com/aprovar_aria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ariaDeRisco }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Erro", "Já interagiu com essa área de risco ou erro na validação");
      } else {
        Alert.alert("Sucesso", "Área de risco validada com sucesso!");
        fetchDataAndCreateCircles(); // Atualizar lista após validação
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      Alert.alert("Erro", "Falha ao validar a área de risco");
    }
  };

  // Atualizar status da zona
  const handleUpdateStatus = () => {
    if (!updateStatus) {
      Alert.alert('Erro', 'Por favor, selecione um status');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const updatedLocations = locations.map(loc => {
        if (loc.id === selectedZone.id) {
          return {
            ...loc,
            status: updateStatus,
            inspected: true,
            description: updateNotes || loc.description
          };
        }
        return loc;
      });
      setLocations(updatedLocations);
      setModalVisible(false);
      setUpdateStatus('');
      setUpdateNotes('');
      setIsLoading(false);
      Alert.alert('Sucesso', 'Status da zona atualizado com sucesso!');
    }, 1500);
  };

  // Filtrar zonas
  const filteredZones = locations.filter(zone => {
    const statusMatch = filterStatus === 'Todos' || zone.status === filterStatus;
    const searchMatch = zone.enderecoFormatado?.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Risco Alto': return '#e53935';
      case 'Em Observação': return '#fb8c00';
      case 'Resolvido': return '#43a047';
      case 'Baixo Risco': return '#8bc34a';
      case 'Não Avaliado': return '#9e9e9e';
      default: return '#666';
    }
  };
  const getDirectImageLink = (googleDriveLink) => {
    try {
      const fileId = googleDriveLink.split("/d/")[1]?.split("/")[0];
      if (!fileId) {
        console.error("Link inválido do Google Drive:", googleDriveLink);
        return null;
      }
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } catch (error) {
      console.error("Erro ao processar o link do Google Drive:", error);
      return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Risco Alto': return <AlertTriangle width={16} height={16} stroke="#fff" />;
      case 'Em Observação': return <Clock width={16} height={16} stroke="#fff" />;
      case 'Resolvido': return <CheckCircle width={16} height={16} stroke="#fff" />;
      case 'Baixo Risco': return <CheckCircle width={16} height={16} stroke="#fff" />;
      case 'Não Avaliado': return <Eye width={16} height={16} stroke="#fff" />;
      default: return null;
    }
  };

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      fetchDataAndCreateCircles();
    }
  }, [isLoggedIn]);

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
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.noteText}>
            * Apenas funcionários autorizados da Autoridade Sanitária têm acesso.
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
              setUpdateStatus(item.aprovado || 'Não Avaliado');
              setUpdateNotes(item.description || '');
            }}
          >
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneName}>{item.enderecoFormatado}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status || 'Não Avaliado') }]}>
                {getStatusIcon(item.aprovado || 'Não Avaliado')}
                <Text style={styles.statusText}>{item.status || 'Não Avaliado'}</Text>
              </View>
            </View>
            <Text style={styles.zoneAddress}>Lat: {item.latitude}, Long: {item.longitude}</Text>
            <View style={styles.zoneInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Confirmações:</Text>
                <Text style={styles.infoValue}>{item.confirmationCount}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Chuva:</Text>
                <Text style={styles.infoValue}>{item.chuva}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Temperatura:</Text>
                <Text style={styles.infoValue}>{item.temperatura}</Text>
              </View>
            </View>
            <Text numberOfLines={2} style={styles.zoneDescription}>
              {item.description || 'Sem descrição disponível'}
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
                <Text style={styles.modalZoneName}>{selectedZone.enderecoFormatado}</Text>
                <Text style={styles.modalZoneAddress}>Lat: {selectedZone.latitude}, Long: {selectedZone.longitude}</Text>
                <View style={styles.inputGroup}>
                </View>
                <View style={styles.inputGroup}>
                <Image
                      source={{
                        uri: getDirectImageLink(selectedZone.imagem),
                      }}
                      style={styles.panelImage}
                      onError={(error) =>
                        console.error("Erro ao carregar imagem:", error.nativeEvent.error)
                      }
                    />
                </View>
                <TouchableOpacity 
                  style={styles.confirmButton} 
                  onPress={() => handleConfirmarRisco(selectedZone.id)}
                  disabled={isLoading}
                >
                  <Text style={styles.confirmButtonText}>Validar como Área de Risco</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={async () => {
          await AsyncStorage.removeItem('BearerToken');
          setIsLoggedIn(false);
        }}
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
  confirmButton: {
    backgroundColor: '#158ADD',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
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
    paddingBottom: 80,
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
  panelImage: {
    width: screenWidth * 0.8,
    height: 200,
    borderRadius: 10,
    marginBottom: 10, // Espaço entre a imagem e o texto
  },
});