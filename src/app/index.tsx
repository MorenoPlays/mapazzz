import { View, Text, StyleSheet, Alert, Image, Dimensions } from "react-native"
import { Button } from "../components/Button";
import CameraComponente from "./imagem";
import Questionario from "../components/Questionario";
import { router, useLocalSearchParams } from "expo-router";
import { Camera } from "expo-camera";
import Camera_expo from "./camera";
import TelaMapa from "./Mapa";
import Footer from "../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import ImageViewer from '../components/ImageViewer';
import * as SecureStore from 'expo-secure-store';



const PlaceholderImage = require("@/assets/images/background-image.png");
const DEVICE_ID_KEY = 'device-id';

export default function Index() {

    const { width, height } = Dimensions.get("window");
    let tam = width;
    let lar = height;
    const [logado, setLogado] = useState(false);

    function entrar()
    {
        setLogado(true);
    }
    return (
        <>
            {
                logado ? (<>
                    <View style={{ flex: 1, paddingBottom: lar * 0.1, }}>
                        {/* <Camera_expo/> */}
                        <TelaMapa />
                        <Footer />
                    </View>
                </>) : (<>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <ImageViewer imgSource={PlaceholderImage} />
                            <View style={styles.textos}>
                                <Text style={styles.text0}> Mapa Zzz</Text>
                            </View>
                        </View>
                        <View style={styles.footerContainer}>
                            <Button title='começar' onPress={entrar} />
                        </View>
                    </View>
                </>)
            }

        </>
    );
}

const style = StyleSheet.create({
    titolo:
    {
        color: "white",
        fontFamily: "arial",
        fontSize: 30
    },
    back:
    {
        backgroundColor: "white",
        alignItems: "center",
        textAlign: "auto",
        justifyContent: "center"
    }
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#238b45',
      alignItems: 'center',
    },
    
    textos:
    {
      alignItems: 'center',
      marginBottom: "48%",
    },
  
    text0:
    {
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