import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator
} from 'react-native';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  MapPin, 
  AlertCircle,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'react-native-feather';
import { LineChart, BarChart, PieChart as RNPieChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  
  // Dados simulados para os gráficos e estatísticas
  const [stats, setStats] = useState({
    totalCases: 755,
    activeCases: 324,
    recoveredCases: 418,
    fatalCases: 13,
    totalClinics: 32,
    totalZones: 18,
    totalContributions: 87,
    verifiedContributions: 52
  });
  
  const [trendData, setTrendData] = useState({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [120, 145, 132, 165, 178, 190],
        color: () => '#2E7D32',
        strokeWidth: 2
      }
    ]
  });
  
  const [regionData, setRegionData] = useState([
    { name: 'Luanda', value: 45, color: '#FF6384' },
    { name: 'Bengo', value: 25, color: '#36A2EB' },
    { name: 'Benguela', value: 30, color: '#FFCE56' },
    { name: 'Cuanza Norte', value: 15, color: '#4BC0C0' },
    { name: 'Malanje', value: 10, color: '#9966FF' }
  ]);
  
  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: 'Hospital Geral de Luanda',
      cases: 125,
      zone: 'Luanda',
      change: '+12%'
    },
    {
      id: 2,
      name: 'Clínica Girassol',
      cases: 87,
      zone: 'Luanda',
      change: '+5%'
    },
    {
      id: 3,
      name: 'Centro de Saúde Bengo',
      cases: 65,
      zone: 'Bengo',
      change: '-3%'
    },
    {
      id: 4,
      name: 'Hospital Provincial de Benguela',
      cases: 93,
      zone: 'Benguela',
      change: '+8%'
    },
    {
      id: 5,
      name: 'Hospital Regional de  Malanje',
      cases: 42,
      zone: 'Malanje',
      change: '+2%'
    }
  ]);
  
  // Simulação de carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Principal</Text>
        <Text style={styles.headerSubtitle}>Visão geral de casos até Abril 2025</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <StatCard 
            title="Casos Totais" 
            value={stats.totalCases} 
            icon={<BarChart2 width={24} height={24} stroke="#2E7D32" />}
            description="Desde Janeiro de 2025"
          />
          <StatCard 
            title="Casos Ativos" 
            value={stats.activeCases} 
            icon={<AlertCircle width={24} height={24} stroke="#e53935" />}
            description={`${Math.round(stats.activeCases/stats.totalCases*100)}% do total`}
            valueColor="#e53935"
          />
        </View>
        
        <View style={styles.statsRow}>
          <StatCard 
            title="Recuperados" 
            value={stats.recoveredCases} 
            icon={<Users width={24} height={24} stroke="#43a047" />}
            description={`${Math.round(stats.recoveredCases/stats.totalCases*100)}% do total`}
            valueColor="#43a047"
          />
          <StatCard 
            title="Unidades de Saúde" 
            value={stats.totalClinics} 
            icon={<MapPin width={24} height={24} stroke="#1976d2" />}
            description={`Em ${stats.totalZones} zonas`}
            valueColor="#1976d2"
          />
        </View>
      </View>
      
      <Card title="Tendência de Casos">
        <Text style={styles.chartSubtitle}>Últimos 6 meses</Text>
        <LineChart
          data={trendData}
          width={Dimensions.get('window').width - 64}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#2E7D32'
            }
          }}
          bezier
          style={styles.chart}
        />
      </Card>
      
      <Card title="Contribuições da População">
        <View style={styles.contributionsContainer}>
          <View style={styles.contributionStats}>
            <View style={styles.contributionStatItem}>
              <Text style={styles.contributionStatValue}>{stats.totalContributions}</Text>
              <Text style={styles.contributionStatLabel}>Total de Relatos</Text>
            </View>
            <View style={styles.contributionSeparator} />
            <View style={styles.contributionStatItem}>
              <Text style={[styles.contributionStatValue, { color: '#43a047' }]}>{stats.verifiedContributions}</Text>
              <Text style={styles.contributionStatLabel}>Verificados</Text>
            </View>
            <View style={styles.contributionSeparator} />
            <View style={styles.contributionStatItem}>
              <Text style={[styles.contributionStatValue, { color: '#fb8c00' }]}>{stats.totalContributions - stats.verifiedContributions}</Text>
              <Text style={styles.contributionStatLabel}>Pendentes</Text>
            </View>
          </View>
          
          <View style={styles.contributionVerifications}>
            <Text style={styles.verificationTitle}>Contribuições Recentes Verificadas</Text>
            
            <ContributionCard 
              location="Bairro Morro Bento, Rua 21"
              date="15/01/2025"
              status="Confirmado"
              description="Área com muita água parada após as chuvas. Vários casos reportados."
            />
            
            <ContributionCard 
              location="Bairro Nova Vida, próximo ao mercado"
              date="10/01/2025"
              status="Confirmado"
              description="Muitos mosquitos na região e 5 casos confirmados de malária."
            />
            
            <ContributionCard 
              location="Golfe 2, Avenida Principal"
              date="05/01/2025"
              status="Resolvido"
              description="Área foi pulverizada e o problema foi resolvido."
            />
          </View>
        </View>
      </Card>
      
      <Card title="Distribuição por Região">
        <PieChartWithLegend data={regionData} />
      </Card>
      
      <Card title="Clínicas com Mais Casos">
        <View style={styles.clinicsContainer}>
          {clinics.map(clinic => (
            <ClinicCard 
              key={clinic.id}
              name={clinic.name}
              cases={clinic.cases}
              zone={clinic.zone}
              change={clinic.change}
            />
          ))}
        </View>
      </Card>
    </ScrollView>
  );
}

function StatCard({ title, value, icon, description, valueColor = '#2E7D32' }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        {icon}
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
      <Text style={styles.statDescription}>{description}</Text>
    </View>
  );
}

function Card({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ClinicCard({ name, cases, zone, change }) {
  const isPositive = change.startsWith('+');
  
  return (
    <View style={styles.clinicCard}>
      <View style={styles.clinicHeader}>
        <Text style={styles.clinicName}>{name}</Text>
        <View style={[
          styles.changeBadge, 
          { backgroundColor: isPositive ? '#ffebee' : '#e8f5e9' }
        ]}>
          <Text style={[
            styles.changeText, 
            { color: isPositive ? '#e53935' : '#43a047' }
          ]}>
            {change}
          </Text>
        </View>
      </View>
      <View style={styles.clinicInfo}>
        <View style={styles.clinicDataItem}>
          <Text style={styles.clinicDataLabel}>Casos</Text>
          <Text style={styles.clinicDataValue}>{cases}</Text>
        </View>
        <View style={styles.clinicDataItem}>
          <Text style={styles.clinicDataLabel}>Zona</Text>
          <Text style={styles.clinicDataValue}>{zone}</Text>
        </View>
      </View>
    </View>
  );
}

function PieChartWithLegend({ data }) {
  // Preparar dados para o gráfico de pizza
  const chartData = data.map(item => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
  }));
  
  return (
    <View style={styles.pieChartContainer}>
      <RNPieChart
        data={chartData}
        width={Dimensions.get('window').width - 64}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

function ContributionCard({ location, date, status, description }) {
  const getStatusColor = () => {
    switch(status) {
      case 'Confirmado': return '#e53935';
      case 'Em análise': return '#fb8c00';
      case 'Resolvido': return '#43a047';
      default: return '#666';
    }
  };
  
  const getStatusIcon = () => {
    switch(status) {
      case 'Confirmado': return <AlertTriangle width={16} height={16} stroke="#fff" />;
      case 'Em análise': return <Clock width={16} height={16} stroke="#fff" />;
      case 'Resolvido': return <CheckCircle width={16} height={16} stroke="#fff" />;
      default: return null;
    }
  };
  
  return (
    <View style={styles.contributionCard}>
      <View style={styles.contributionHeader}>
        <View style={styles.contributionLocationContainer}>
          <MapPin width={14} height={14} stroke="#666" />
          <Text style={styles.contributionLocation}>{location}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          {getStatusIcon()}
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      
      <Text numberOfLines={2} style={styles.contributionDescription}>{description}</Text>
      
      <Text style={styles.contributionDate}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 16,
    backgroundColor: '#2E7D32',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 12,
    color: '#999',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
    marginVertical: 8,
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  clinicsContainer: {
    marginTop: 8,
  },
  clinicCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  clinicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clinicName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  clinicInfo: {
    flexDirection: 'row',
  },
  clinicDataItem: {
    flex: 1,
  },
  clinicDataLabel: {
    fontSize: 12,
    color: '#999',
  },
  clinicDataValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  // Estilos para contribuições
  contributionsContainer: {
    marginTop: 8,
  },
  contributionStats: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contributionStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  contributionStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  contributionStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  contributionSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  contributionVerifications: {
    marginTop: 8,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  contributionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  contributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contributionLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contributionLocation: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 6,
    flex: 1,
  },
  contributionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contributionDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});