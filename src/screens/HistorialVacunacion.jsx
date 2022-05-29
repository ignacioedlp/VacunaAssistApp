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
    Box,
    Heading
  } from "native-base";


function HistorialVacunacion() {

  const [historial, setHistorial] = useState([]);

  const ObtenerHistorial = async () => { 
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
  
  
    const result = await fetch("https://vacunassistservices-production.up.railway.app/turnos/historial", requestOptions)
      .catch(error => console.log('error', error));
    const res = await result.json()
    setHistorial(res)
  } 

  useEffect(() => {
    ObtenerHistorial();
  },[])

  return (
    <NativeBaseProvider>
      <Heading>Historial de vacunacion</Heading>
      <FlatList data={historial} renderItem={({item}) => 
        <Box>
          <Text>Campaña: {item.campania}</Text>
          {item.marca != "" ? <Text>Marca: {item.marca}</Text> : null}
          {item.lote != -1 ?  <Text>Lote: {item.lote}</Text> : null}
          <Text>Fecha: {item.fecha}</Text>
        </Box>} 

    />

    </NativeBaseProvider>
    
  )


}

export default HistorialVacunacion