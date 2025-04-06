import React, { useRef, useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
import * as Location from "expo-location";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { Search, MapPin, Layers } from "lucide-react-native";
import { router } from "expo-router";

export default function TelaMapa() {
  const [user, setUser] = useState("");
  const mapRef = useRef<MapView>(null);
  const [viewMap, setViewMap] = useState<any>("standard");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [longitude, setLongitude] = useState(0);
  const [lantitude, setLantitude] = useState(0);

  const zonesInDanger = [
    { id: "1", name: "Zona Central" },
    { id: "2", name: "Bairro Industrial" },
    { id: "3", name: "Região Litorânea" },
  ];

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
  handleGetCurrentLocation();
  return (
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
          />

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
});
