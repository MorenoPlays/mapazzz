import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { CheckCircle, Clipboard, AlertTriangle, Upload, Users } from 'react-native-feather';
import { Picker } from '@react-native-picker/picker';

export default function ClinicUpdateScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [registrationData, setRegistrationData] = useState({
    clinicName: '',
    address: '',
    zone: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [updateData, setUpdateData] = useState({
    newCases: '',
    recoveredCases: '',
    observations: '',
    zoneCondition: 'normal',
  });
  
  const [showRegistration, setShowRegistration] = useState(false);
  
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
  
  const handleRegister = () => {
    const { password, confirmPassword, clinicName, email, phone } = registrationData;
    
    if (!clinicName || !email || !phone || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de registro
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Solicitação Enviada',
        'Sua solicitação de registro foi enviada para análise. Você receberá um e-mail quando sua conta for aprovada.',
        [{ text: 'OK', onPress: () => setShowRegistration(false) }]
      );
    }, 1500);
  };
  
  const handleUpdateSubmit = () => {
    if (!updateData.newCases) {
      Alert.alert('Erro', 'Por favor, informe ao menos o número de novos casos');
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Dados Atualizados',
        'Os dados foram atualizados com sucesso. Obrigado pela sua contribuição!',
        [{ text: 'OK', onPress: () => {
          setUpdateData({
            newCases: '',
            recoveredCases: '',
            observations: '',
            zoneCondition: 'normal',
          });
        }}]
      );
    }, 1500);
  };
  
  if (!isLoggedIn) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Clipboard width={24} height={24} stroke="#2E7D32" />
          <Text style={styles.headerTitle}>
            {showRegistration ? 'Cadastro de Unidade de Saúde' : 'Portal de Unidades de Saúde'}
          </Text>
        </View>
        
        {!showRegistration ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Login</Text>
            <Text style={styles.formSubtitle}>
              Acesse para atualizar dados sobre casos de malária em sua unidade
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
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
            
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => setShowRegistration(true)}
            >
              <Text style={styles.linkButtonText}>
                Não tem cadastro? Registre sua unidade de saúde
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Cadastro de Unidade de Saúde</Text>
            <Text style={styles.formSubtitle}>
              Preencha os dados abaixo para solicitar acesso ao sistema
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Unidade de Saúde</Text>
              <TextInput
                style={styles.input}
                placeholder="Hospital / Clínica / Posto de Saúde"
                value={registrationData.clinicName}
                onChangeText={(text) => setRegistrationData({...registrationData, clinicName: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.input}
                placeholder="Rua, Número, Bairro"
                value={registrationData.address}
                onChangeText={(text) => setRegistrationData({...registrationData, address: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Zona</Text>
              <TextInput
                style={styles.input}
                placeholder="Município / Região"
                value={registrationData.zone}
                onChangeText={(text) => setRegistrationData({...registrationData, zone: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pessoa de Contato</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={registrationData.contactPerson}
                onChangeText={(text) => setRegistrationData({...registrationData, contactPerson: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="email@clinica.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={registrationData.email}
                onChangeText={(text) => setRegistrationData({...registrationData, email: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="(00) 0000-0000"
                keyboardType="phone-pad"
                value={registrationData.phone}
                onChangeText={(text) => setRegistrationData({...registrationData, phone: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Crie uma senha"
                secureTextEntry
                value={registrationData.password}
                onChangeText={(text) => setRegistrationData({...registrationData, password: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Repita a senha"
                secureTextEntry
                value={registrationData.confirmPassword}
                onChangeText={(text) => setRegistrationData({...registrationData, confirmPassword: text})}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Solicitar Cadastro</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => setShowRegistration(false)}
            >
              <Text style={styles.linkButtonText}>
                Já possui cadastro? Faça login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
  
  // Tela após o login
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Upload width={24} height={24} stroke="#2E7D32" />
        <Text style={styles.headerTitle}>Atualização de Dados de Malária</Text>
      </View>
      
      <View style={styles.clinicInfoCard}>
        <Text style={styles.clinicName}>Hospital Central de Angola</Text>
        <Text style={styles.clinicAddress}>Rua Principal, 123 - Luanda</Text>
        <View style={styles.statistics}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>245</Text>
            <Text style={styles.statLabel}>Casos Totais</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>189</Text>
            <Text style={styles.statLabel}>Recuperados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#e53935' }]}>56</Text>
            <Text style={styles.statLabel}>Em Tratamento</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Atualizar Dados</Text>
        <Text style={styles.lastUpdate}>Última atualização: 15/01/2025</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Novos Casos</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de novos casos"
            keyboardType="number-pad"
            value={updateData.newCases}
            onChangeText={(text) => setUpdateData({...updateData, newCases: text})}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Casos Recuperados</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de pacientes recuperados"
            keyboardType="number-pad"
            value={updateData.recoveredCases}
            onChangeText={(text) => setUpdateData({...updateData, recoveredCases: text})}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Condição da Zona</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={updateData.zoneCondition}
              onValueChange={(itemValue) => 
                setUpdateData({...updateData, zoneCondition: itemValue})
              }
              style={styles.picker}
            >
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Alerta - Aumento de Casos" value="alert" />
              <Picker.Item label="Crítica - Surto Confirmado" value="critical" />
            </Picker>
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Informações adicionais sobre os casos..."
            multiline={true}
            numberOfLines={4}
            value={updateData.observations}
            onChangeText={(text) => setUpdateData({...updateData, observations: text})}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleUpdateSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Atualizar Dados</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.recentUpdates}>
        <Text style={styles.sectionTitle}>Histórico de Atualizações</Text>
        
        <UpdateHistoryCard 
          date="15/01/2025"
          newCases={12}
          recoveredCases={8}
          updatedBy="Dr. João Silva"
        />
        
        <UpdateHistoryCard 
          date="10/01/2025"
          newCases={18}
          recoveredCases={5}
          updatedBy="Dra. Maria Santos"
        />
        
        <UpdateHistoryCard 
          date="05/01/2025"
          newCases={22}
          recoveredCases={10}
          updatedBy="Enf. Pedro Neto"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function UpdateHistoryCard({ date, newCases, recoveredCases, updatedBy }) {
  return (
    <View style={styles.updateCard}>
      <View style={styles.updateHeader}>
        <Text style={styles.updateDate}>{date}</Text>
        <Text style={styles.updateUser}>{updatedBy}</Text>
      </View>
      
      <View style={styles.updateStats}>
        <View style={styles.updateStatItem}>
          <Users width={16} height={16} stroke="#e53935" />
          <Text style={styles.updateStatLabel}>Novos Casos:</Text>
          <Text style={styles.updateStatValue}>{newCases}</Text>
        </View>
        
        <View style={styles.updateStatItem}>
          <CheckCircle width={16} height={16} stroke="#43a047" />
          <Text style={styles.updateStatLabel}>Recuperados:</Text>
          <Text style={styles.updateStatValue}>{recoveredCases}</Text>
        </View>
      </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  picker: {
    height: 50,
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
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  clinicInfoCard: {
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
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clinicAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  lastUpdate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  recentUpdates: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  updateCard: {
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
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  updateDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  updateUser: {
    fontSize: 14,
    color: '#666',
  },
  updateStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateStatLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  updateStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e53935',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    margin: 16,
  },
  logoutButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
});