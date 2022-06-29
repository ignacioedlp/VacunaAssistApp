import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Center,
  NativeBaseProvider,
  FlatList,
  Heading,
  Text,
  HStack,
  Spinner,
} from "native-base";
import Historial from "../../components/HistorialTarjeta";
import { useDispatch, useSelector } from "react-redux";

function HistorialVacunacion() {
  const [historial, setHistorial] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const ObtenerHistorial = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
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
    setIsLoading(false);
    
  };

  useEffect(() => {
    ObtenerHistorial();
  }, []);

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Historial de vacunacion
          </Heading>
        </Center>
        {historial.length > 0 ? (
          <FlatList
            w="100%"
            data={historial}
            renderItem={({ item }) => (
              <Historial
                campania={item.campania}
                fecha={item.fecha}
                marca={item.marca}
                lote={item.lote}
                estado={item.estado}
              />
            )}
          />
        ) : (
          <Center>
            <Text>No posee vacunas aplicadas</Text>
          </Center>
        )}
      </Center>
    </NativeBaseProvider>
  );
}

export default HistorialVacunacion;
