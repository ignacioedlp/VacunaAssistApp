import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Center, NativeBaseProvider, FlatList, Heading } from "native-base";
import Historial from "../components/HistorialTarjeta";

function HistorialVacunacion() {
  const [historial, setHistorial] = useState([]);

  const ObtenerHistorial = async () => {
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
      "https://vacunassistservices-production.up.railway.app/turnos/historial",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setHistorial(res);
  };

  useEffect(() => {
    ObtenerHistorial();
  }, []);

  return (
    <NativeBaseProvider>
      <Center>
        <Heading size="lg" ml="-1" p="10px">
          Historial de vacunacion
        </Heading>
      </Center>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <Historial
            campania={item.campania}
            fecha={item.fecha}
            marca={item.marca}
            lote={item.lote}
          />
        )}
      />
    </NativeBaseProvider>
  );
}

export default HistorialVacunacion;
