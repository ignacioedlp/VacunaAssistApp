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
import TurnoCanceladoTarjeta from "../../../components/TurnoCanceladoTarjeta";

function TurnosCancelados() {
  const [turnosCancelados, setTurnosCancelados] = useState([
    {
      dni: "44444443",
      vacunatorio: "Corralon",
      campania: "Covid",
      nombreYApellido: "Nova",
      fecha: Date.now(),
      nroTurno: 333,
    },
  ]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const ObtenerTurnosCancelados = async () => {
    // var myHeaders = new Headers();
    // const value = userData.token;
    // const token = "Bearer " + value;
    // myHeaders.append("Authorization", token);
    // var raw = "";

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // const result = await fetch(
    //   "https://vacunassistservices-production.up.railway.app/admin/ver_stock",
    //   requestOptions
    // ).catch((error) => console.log("error", error));
    // const res = await result.json();
    // setTurnosCancelados(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerTurnosCancelados();
  });

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Turnos cancelados
          </Heading>
          {turnosCancelados.length > 0 ? (
            <FlatList
              w="75%"
              maxW="300px"
              data={turnosCancelados}
              renderItem={({ item }) => (
                <TurnoCanceladoTarjeta
                  nombreYApellido={item.nombreYApellido}
                  nroTurno={item.nroTurno}
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

export default TurnosCancelados;
