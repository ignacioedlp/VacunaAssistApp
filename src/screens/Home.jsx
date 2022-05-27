import React from 'react'
import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Text,
} from "native-base";
import HistorialVacunacionScreen from './HistorialVacunacion';
import TurnosPendientesScreen from './TurnosPendientes';


const handlerSolicitarFiebre = async () => {
  const response = await fetch("https://vacunassistservices-production.up.railway.app/turnos/fiebre_amarrilla", {
    method: "GET",
    headers: {
      "X-Auth-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjQzNzM4Mjc1LCJyb2wiOiJDaXVkYWRhbm8iLCJleHAiOjE2NTM4NTg3ODh9.xsiFOyZ3GWeLW1aUH10E1XxPm9tJC3Deb0aMwi72rko"
    }
  }).then((response) => response.json());
  if (response.code == 200) {
    alert('Turno solicitado')
  }else{
    alert("Error al solicitar turno")
  }
};

const handlerSolicitarCovid = async () => {
  const response = await fetch("https://vacunassistservices-production.up.railway.app/turnos/covid", {
    method: "GET",
    headers: {
      "X-Auth-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjQzNzM4Mjc1LCJyb2wiOiJDaXVkYWRhbm8iLCJleHAiOjE2NTM4NTg3ODh9.xsiFOyZ3GWeLW1aUH10E1XxPm9tJC3Deb0aMwi72rko"
    }
  }).then((response) => response.json());
  if (response.code == 200) {
    alert('Turno solicitado')
  }else{
    alert("Error al solicitar turno")
  }
};

const handlerSolicitarGripe = async () => {
  const response = await fetch("https://vacunassistservices-production.up.railway.app/turnos/gripe", {
    method: "GET",
    headers: {
      "X-Auth-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjQzNzM4Mjc1LCJyb2wiOiJDaXVkYWRhbm8iLCJleHAiOjE2NTM4NTg3ODh9.xsiFOyZ3GWeLW1aUH10E1XxPm9tJC3Deb0aMwi72rko"
    }
  }).then((response) => response.json());
  if (response.code == 200) {
    alert('Turno solicitado')
  }else{
    alert('Error al solicitar turno')
  }
};


function HomeScreen() {
  return (
    <NativeBaseProvider>
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