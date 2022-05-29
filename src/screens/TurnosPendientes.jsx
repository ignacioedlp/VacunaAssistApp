import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, FlatList, Box, Heading } from "native-base";

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
      <Heading size="xl" mb="4">
        Turnos pendientes
      </Heading>
      <FlatList
        data={pendientes}
        renderItem={({ item }) => (
          <Box>
            <Text>Campaña: {item.campania}</Text>
            <Text>Vacunatorio: {item.vacunatorio}</Text>
            <Text>Fecha: {item.fecha}</Text>
          </Box>
        )}
      />
    </NativeBaseProvider>
  );
}

export default TurnosPendientes;
