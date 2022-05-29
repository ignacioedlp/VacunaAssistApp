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

const handlerSolicitarFiebre = async () => {
  var myHeaders = new Headers();
  const value = await AsyncStorage.getItem('@JWTUSER');
  const token = ('Bearer ' + value);
  myHeaders.append("Authorization", token);

  var raw = "";

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://vacunassistservices-production.up.railway.app/turnos/fiebre_amarrilla", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.code = 200) {
        console.log(result.message);
      } else {
        console.log(result.message)
      }
    })
    .catch(error => console.log('error', error));
};

const handlerSolicitarCovid = async () => {
  var myHeaders = new Headers();
  const value = await AsyncStorage.getItem('@JWTUSER');
  const token = ('Bearer ' + value);
  myHeaders.append("Authorization", token);
  var raw = "";

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://vacunassistservices-production.up.railway.app/turnos/covid", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.code = 200) {
        console.log(result.message);
      } else {
        console.log(result.message)
      }
    })
    .catch(error => console.log('error', error));
};

const handlerSolicitarGripe = async () => {
  var myHeaders = new Headers();
  const value = await AsyncStorage.getItem('@JWTUSER');
  const token = ('Bearer ' + value);
  myHeaders.append("Authorization", token);
  var raw = "";

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://vacunassistservices-production.up.railway.app/turnos/gripe", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.code = 200) {
        console.log(result.message);
      } else {
        console.log(result.message)
      }
    })
    .catch(error => console.log('error', error));
  };
  


function HomeScreen({navigation}) {
  return (
    <NativeBaseProvider>
      <Center>
        <Button onPress={() => navigation.navigate('Turnos pendientes')}>Turnos pendientes</Button>
        <Button onPress={() => navigation.navigate('Historial')}>Mis vacunas</Button>
        <Button onPress={() => navigation.navigate('Logout')}>Cerrar sesion</Button>
        <Button onPress={() => navigation.navigate('Listado de turnos')}>Ver listado</Button>
      </Center>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Text fontSize="md">Home</Text>
          <Button onPress={() => handlerSolicitarFiebre()}>Solicitar turno Fiebre</Button>
          <Button onPress={() => handlerSolicitarCovid()}>Solicitar turno COVID-19</Button>
          <Button onPress={() => handlerSolicitarGripe()}>Solicitar turno Gripe</Button>
        </Stack>
      </Center>
    </NativeBaseProvider>
  )
}

export default HomeScreen