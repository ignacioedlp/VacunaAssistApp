import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Center,
  Spinner,
  Stack,
  Heading,
  Text,
  HStack,
  FlatList,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import TurnoTarjeta from "../../../components/TurnoTarjeta";

function HistorialTurnos() {
  const [turnos, setTurnos] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const ObtenerTurnos = async () => {
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
      "https://vacunassistservices-production.up.railway.app/admin/ver_turnos",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setTurnos(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerTurnos();
  }, []);

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Turnos
          </Heading>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {turnos.length}
          </Heading>
          {turnos.length > 0 ? (
            <FlatList
              w="100%"
              data={turnos}
              renderItem={({ item }) => (
                <TurnoTarjeta
                  nroTurno={item.id_turno}
                  fecha={item.fecha}
                  vacunatorio={item.vacunatorio}
                  dni={item.dni}
                  campania={item.campania}
                />
              )}
            />
          ) : (
            <Center>
              <Text>No posee vacunas aplicadas</Text>
            </Center>
          )}
        </Center>
      ) : (
        <HStack space={2} justifyContent="center" marginTop={5}>
          <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
          <Heading color="emerald.500" fontSize="md">
            Cargando datos
          </Heading>
        </HStack>
      )}
    </NativeBaseProvider>
  );
}

export default HistorialTurnos;
