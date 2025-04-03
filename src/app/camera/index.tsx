import React , {useState, useEffect} from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
export default function Camera_expo() {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [permission, setPermission] = useState(null);

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === "granted");
      } )();
    }, []);

    if(permission === null)
      return <View/>
    else if (permission === false)
      return <Text>Acesso negado!</Text>
  return (
    <SafeAreaView style={{flex:1}}>
      <Camera style={{flex:1}} type={type}/>
    </SafeAreaView>
  );
}
