import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Input,
    Center,
    Stack,
    NativeBaseProvider,
    Button,
    Text,
    FlatList,
    Box
  } from "native-base";


function CargarDatosScreen({route}) {
  const {dni, id_campania, idTurno} = route.params;
  const [nro_lote, setNro_lote] = useState("");
  const [marca, setMarca] = useState("");
  const handlerNro_lote = (nro) => setNro_lote(nro);
  const handlerMarca= (marca) => setMarca(marca);


  const cargarDatos = async () => { 
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem('@JWTUSER');
    const token = ('Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjExMTExMTEyLCJyb2wiOiJWYWN1bmFkb3IiLCJleHAiOjE2NTM5NTE3NDd9.vGYrg0LMRTJM-8goY6rlDg1xFySBjErtkT49sg3hfgg");
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id_campania": id_campania,
    "id_usuario": dni,
    "nro_lote": parseInt(nro_lote),
    "marca": marca,
    "desconocido": false,
    "id_turno": idTurno
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  
    const result = await fetch("https://vacunassistservices-production.up.railway.app/vacunador/cargar_datos", requestOptions)
      .catch(error => console.log('error', error));
    const res = await result.json()
    setHistorial(res)
  } 


  return (
    
      <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Text fontSize="md">Cargar datos del ciudadano {dni}</Text>
          <Input
            onChangeText={handlerNro_lote}
            size="xs"
            value={nro_lote}
            placeholder="Numero del lote"
          />
          <Input
            onChangeText={handlerMarca}
            size="xs"
            value={marca}
            placeholder="Marca de la vacuna"
          />
          <Button onPress={() => cargarDatos()}>Cargar</Button>
        </Stack>
      </Center>
    

    </NativeBaseProvider>
    
  )


}

export default CargarDatosScreen