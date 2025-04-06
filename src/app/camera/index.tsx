import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import Questionario from "@/src/components/Questionario";
import { styles } from "./style";
import { json } from "stream/consumers";

// URL do seu servidor
const API_URL = 'https://mapazz.serveo.net/upload';  // Substitua pelo seu URL de produção

const Camera_expo = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef(null);
  const [fotada, setFotada] = useState(false);
  const router = useRouter();
  const [imagemuri, setImagemuri] = useState("");

  useEffect(() => {
    if (!galleryPermission?.granted) {
      requestGalleryPermission();
    }
  }, [galleryPermission]);

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Precisamos de permissão para acessar a câmera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "blue", marginTop: 10 }}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function trocarCamera() {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }

  async function capturarFoto() {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        exif: false,
      });

      console.log("📸 Foto capturada:", photo.uri);
      salvarNaGaleria(photo.uri);
    } catch (error) {
      console.error("Erro ao capturar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto.");
    }
  }

  async function salvarNaGaleria(uri: string) {
    try {
      setImagemuri(uri);
      setFotada(true);
    } catch (error) {
      console.error("Erro ao salvar na galeria:", error);
    }
  }

  function resetfoto() {
    setFotada(false);
  }

  async function uploadImageToServer(uri: string) {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: uri, // URI do arquivo
        name: "foto-upload.jpg", // Nome do arquivo enviado
        type: "image/jpeg", // Tipo MIME do arquivo
      });
  
      const response = await fetch("https://mapazz.serveo.net/upload", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json', // Aceitar JSON do servidor
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Arquivo enviado com sucesso:', data);
  
      return data.fileId || null; // Trabalhe apenas com `fileId` ou dados simples
    } catch (error) {
      console.error("Erro ao enviar a imagem para o servidor:", error);
      Alert.alert("Erro", "Não foi possível enviar a imagem.");
      return null;
    }
  }
  
  

  const { width, height } = Dimensions.get("window");

  return (
    <>
      {fotada ? (
        <View style={{ width, height, flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: imagemuri }} style={styles.imagem} />
          </View>

          <Button title="Tirar nova foto" onPress={resetfoto} />
          <Questionario />

          <Button
            title="Envia Resposta"
            onPress={async () => {
              console.log("processando...");
              const fileId = await uploadImageToServer(imagemuri);
              if (fileId) {
                Alert.alert("✅ Imagem enviada!");
                console.log("🔗 Link da imagem:", fileId);
              } else {
                Alert.alert("❌ Erro", "Não foi possível enviar a imagem.");
              }
            }}
          />
        </View>
      ) : (
        <SafeAreaView style={{ width, height, flex: 1 }}>
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

          <TouchableOpacity onPress={trocarCamera} style={{ padding: 10, backgroundColor: "#ddd" }}>
            <Text>🔄 Trocar Câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={capturarFoto} style={{ padding: 10, backgroundColor: "#ddd" }}>
            <Text>📸 Capturar Foto</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

export default Camera_expo;
