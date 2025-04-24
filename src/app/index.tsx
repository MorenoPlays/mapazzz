import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Button } from "../components/Button";
import TelaMapa from "./Mapa";
import ImageViewer from "../components/ImageViewer";
import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [token, setToken] = useState("");
  const [logado, setLogado] = useState(false);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const tokenT = await AsyncStorage.getItem("BearerToken");
        if (!tokenT) {
          console.log("Token não encontrado");
          return;
        }

        const response = await fetch("https://api-mapazzz.onrender.com/verify_token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenT}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Resposta do backend:", data);

          if (data.rota === 1) {
            // Usuário comum
            setLogado(true);
          } else if (data.rota === 2) {
            // Admin
            router.push("/(admin)/Authorities"); // ajuste para a rota de admin
          } else {
            // Token estranho
            await AsyncStorage.removeItem("BearerToken");
            console.log("Token inválido, removido");
          }
        } else {
          console.log("Token inválido, removendo...");
          await AsyncStorage.removeItem("BearerToken");
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        await AsyncStorage.removeItem("BearerToken");
      }
    };

    verifyToken();
  }, []);

  function entrar() {
    setLogado(true);
  }

  return (
    <>
      {logado ? (
        <View style={{ flex: 1, paddingBottom: height * 0.1 }}>
          <TelaMapa />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} />
            <View style={styles.textos}>
              <Text style={styles.text0}> Mapa Zzz</Text>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Button title="começar" onPress={entrar} />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#238b45',
    alignItems: 'center',
  },
  textos: {
    alignItems: 'center',
    marginBottom: "48%",
  },
  text0: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 4,
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
});
