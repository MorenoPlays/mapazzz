import {View, Text, StyleSheet, Alert} from "react-native"
import { Button } from "../components/Button";
import CameraComponente from "../components/imagem";
import Questionario from "../components/Questionario";
export default function Index()
{
    // function mensagem()
    // {
    //     Alert.alert("Fazer Login");
    // }

    return(
        <View style={style.back}>
            <CameraComponente/>
            <View>
                <Questionario/>
            </View>
            <Button title="Envia Resposta"/>
        </View>
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
        width:"100%",
        height: "100%",
        alignItems: "center",
        textAlign: "auto",
        justifyContent: "center"
    }
})