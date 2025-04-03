
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from "react";
import { Image, Alert} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "../Button";
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const CameraComponente = () => {
    // const [imageUri, setImageUri] = useState(null);
    // const opencamera = () => {
    //     launchCamera(
    //         {
    //             mediaType: 'photo',
    //             cameraType: 'back',
    //             quality:1,
    //         },
    //         (response) => {
    //             if(response.didCancel)
    //             {
    //                 console.log('Usuario cancelou a captura');
    //             }else if(response.errorCode){
    //                 console.log('Erro ao tirar a foto', response);
    //             }
    //             else
    //             {
    //                 setImageUri(response.assets[0].uri);
    //             }
    //         }
    //     );
    // };

    // const openGalley = () => {
    //     launchImageLibrary (
    //         {
    //             mediaType: 'photo',
    //             quality:1,
    //         },
    //         (response) => {
    //             if(response.didCancel)
    //             {
    //                 console.log("usuario cancelou o carregamento da foto");
    //             }
    //             else if (response.errorCode)
    //             {
    //                 console.log('teve um erro ao carregar a foto');
    //             }
    //             else
    //             {
    //                 setImageUri(response.assets[0].uri);
    //             }
    //         }

    //     );
    // };
    const camera_last = useRouter();
    return (
        <View style={styles.painel}>
            <Text>Partilhar Imagem</Text>
            <View style={styles.container}>
            </View>
           {/* // {<Image source={{uri:imageUri}} style={styles.imagem}/>} */}
            <View>
                <Button title="Tirar foto" onPress={() => camera_last.push("/camera")}/>
                <Button title="carregar foto" />
            </View>
        </View>
    )
}

export default CameraComponente;