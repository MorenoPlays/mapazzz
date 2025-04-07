import React, { useRef, useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Image, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, MAP_TYPES, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextInput } from "react-native";
import { Search, MapPin, Layers } from "lucide-react-native";
import { router, Link, usePathname } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface FooterItemProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

const FooterItem: React.FC<FooterItemProps> = ({
  title,
  icon,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.customButton,
        isActive ? styles.activeButton : styles.inactiveButton,
      ]}
      onPress={onPress}
    >
      {icon}
      <Text
        style={[
          styles.buttonText,

        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function TelaMapa() {
  const [token, setToken] = useState("");
  const checkToken = async () => {
    try {
      const tokenT = await AsyncStorage.getItem('BearerToken'); // Chave usada para salvar o token
      if (tokenT) {
        console.log('Token encontrado:', tokenT);
        setToken(tokenT)
        // Adicione aqui qualquer lógica para quando o token existir
      } else {
        console.log('Token não encontrado!');
        // Redirecione o usuário para login ou exiba uma mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
    }
  };
  const pathname = usePathname();
  const [user, setUser] = useState("");
  const mapRef = useRef<MapView>(null);
  const [viewMap, setViewMap] = useState<any>("standard");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [longitude, setLongitude] = useState(0);
  const [lantitude, setLantitude] = useState(0);
  const [locations, setLocations] = useState([])

  // const zonesInDanger = [
  //   { id: "1", name: "Zona Central" },
  //   { id: "2", name: "Bairro Industrial" },
  //   { id: "3", name: "Região Litorânea" },
  // ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handleGetCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      if (location) {
        const { latitude, longitude } = location.coords;
        mapRef.current?.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000
        );
        setLantitude(latitude);
        setLongitude(longitude);
      }
    } catch (error) {
      console.log("Error getting location:", error);
      setErrorMsg("Could not get your current location");
    }
  };

  const toggleMapType = () => {
    setViewMap(
      viewMap === MAP_TYPES.STANDARD ? MAP_TYPES.SATELLITE : MAP_TYPES.STANDARD
    );
  };

  const handleSearch = async () => {
    if (user.trim() === "") return;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão para acessar a localização negada");
        return;
      }
      const results = await Location.geocodeAsync(user);
      if (results && results.length > 0) {
        const { latitude, longitude } = results[0];
        mapRef.current?.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
          1000
        );
        setLantitude(latitude);
        setLongitude(longitude);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataAndCreateCircles = async () => {
    try {
      const response = await fetch("https://mapazz.serveo.net/buscar_aria_de_risco", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Erro ao acessar a API.");

      const data = await response.json();
      console.log(data); // Dados retornados
      setLocations(data); // Atualiza o estado com os resultados
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  useEffect(() => {
    const run = async () => {
      await handleGetCurrentLocation();
      await checkToken();
      await fetchDataAndCreateCircles();
    };
    run();
  }, []);

  
  
  
  checkToken();
  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mapContainer}>
          <View style={styles.topSearchContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                value={user}
                onChangeText={(text) => setUser(text)}
                onSubmitEditing={handleSearch}
                placeholder="Pesquisar por zonas"
                style={styles.searchInput}
              />
              <TouchableOpacity
                onPress={handleSearch}
                style={styles.searchIcon}
              >
                <Search size={18} color={"#158ADD"} />
              </TouchableOpacity>
            </View>
          </View>

          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={viewMap}
            showsUserLocation={true}
            showsMyLocationButton={false}
            initialRegion={{
              latitude: lantitude,
              longitude: longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
          >
            
            {Array.isArray(locations) && locations.length > 0 ? (
  locations.map((location, index) => (
    <Circle
      key={index}
      center={{
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
      }}
      radius={100}
      strokeWidth={2}
      strokeColor="rgb(100, 240, 6)"
      fillColor="rgba(255, 0, 0, 0.1)"
    />
  ))
) : (
  <></> // ou algum tipo de feedback para o usuário
)}
            </MapView>
          

          

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={handleGetCurrentLocation}
            >
              <MapPin size={16} color={"black"} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.mapButton} onPress={toggleMapType}>
              <Layers size={16} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
    <View style={styles.footer}>
      <View style={styles.buttonWrapper}>
        <FooterItem
          title="MAPA"
          icon={
            <Ionicons
              name={pathname === "/" ? "map" : "map-outline"}
              size={24}
              color="black"
            />
          }
          isActive={pathname === "/"}
          onPress={() => router.push("/")}
        />
      </View>

      <TouchableOpacity  onPress={token ? (() => {router.push(`/camera?latitude=${lantitude}&longitude=${longitude}`)}) : () => {router.push("/Login")}}>
          <Image
            source={require("../../../assets/images/button_alert.png")}
            style={{
              width: Dimensions.get("window").width * 0.2,
              height: Dimensions.get("window").width * 0.2,
              top: -Dimensions.get("window").width * 0.1,
              borderRadius: 100,
              backgroundColor: "transparent",
            }}
          />
      </TouchableOpacity>

      <View style={styles.buttonWrapper}>
        <FooterItem
          title="APRENDER"
          icon={
            <Ionicons
              name={
                pathname === "/aprender"
                  ? "game-controller"
                  : "game-controller-outline"
              }
              size={24}
              color="black"
            />
          }
          isActive={pathname === "/aprender"}
          onPress={() => router.push("/Aprender/aprender")}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  topSearchContainer: {
    position: "absolute",
    top: "5%",
    zIndex: 50,
    width: "100%",
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#BFC8CF",
    borderRadius: 20,
    backgroundColor: "white",
  },
  searchInput: {
    flex: 1,
    padding: 12,
    paddingLeft: 20,
  },
  searchIcon: {
    position: "absolute",
    right: 16,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 30,
    right: 16,
    zIndex: 50,
    flexDirection: "column",
    gap: 12,
  },
  mapButton: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapTypeContainer: {
    flexDirection: "row",
    gap: 6,
    padding: 16,
    justifyContent: "space-around",
  },
  mapTypeButton: {
    backgroundColor: "green",
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  mapTypeImage: {
    width: 70,
    height: 50,
    borderRadius: 8,
  },
  zoneContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  zoneItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#BFC8CF",
  },
  footer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: "black",
    backgroundColor: "white",
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width* 0.25,
    height: Dimensions.get("window").width * 0.25,
  },
  customButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  activeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  buttonText: {
    fontSize: 10,
    color: "black",
  },
  inactiveButtonText: {
    fontWeight: "normal",
  },
  activeButtonText: {
    fontWeight: "bold",
  },
});
