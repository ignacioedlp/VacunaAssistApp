import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Center,
  FlatList,
  Box,
  Heading,
  Text,
} from "native-base";
import Pendiente from "../components/PendienteTarjeta";

function TurnosPendientes() {
  const [pendientes, setPendientes] = useState([]);

  const ObtenerPendientes = async () => {
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/pendientes",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setPendientes(res);
  };

  useEffect(() => {
    ObtenerPendientes();
  }, []);

  return (
    <NativeBaseProvider>
      <Center>
        <Heading size="lg" ml="-1" p="10px">
          Turnos pendientes
        </Heading>
      </Center>
      {pendientes.length > 0 ? (

      
        <FlatList
          data={pendientes}
          renderItem={({ item }) => (
            <Pendiente
              campania={item.campania}
              fecha={item.fecha}
              vacunatorio={item.vacunatorio}
            />
          )}
        />
      ) : (
        <Center>
          <Text>No posee turnos pendientes</Text>
        </Center>
      )}
    </NativeBaseProvider>
  );
}

export default TurnosPendientes;
