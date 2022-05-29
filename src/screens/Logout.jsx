import React from 'react'
import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Text,
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogoutScreen({ navigation }) {

    const handlerCerrarSesion = () => {
        _storeData = async () => {
            try {
                await AsyncStorage.removeItem(
                    '@JWTUSER'
                );
                console.log(await AsyncStorage.getItem('@JWTUSER'))
                navigation.navigate('Login')
            } catch (error) {
              console.log(error);
              // Error saving data
            }
          };
          _storeData()
    }


    return (
        <NativeBaseProvider>
            <Center>
                <Text>Quieres cerrar sesion?</Text>
                <Button onPress={() => handlerCerrarSesion()}>Si</Button>
                <Button onPress={() => navigation.navigate('Home')}>No</Button>
            </Center>
        </NativeBaseProvider>
    )
}

export default LogoutScreen