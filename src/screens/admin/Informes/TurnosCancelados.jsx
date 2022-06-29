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
  const [turnosCancelados, setTurnosCancelados] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const ObtenerTurnosCancelados = async () => {
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
      "https://vacunassistservices-production.up.railway.app/admin/ver_cancelados",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setTurnosCancelados(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerTurnosCancelados();
  }, []);

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center w="100%">
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Turnos cancelados
          </Heading>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {turnosCancelados.length}
          </Heading>
          {turnosCancelados.length > 0 ? (
            <FlatList
              w="100%"
              data={turnosCancelados}
              renderItem={({ item }) => (
                <TurnoCanceladoTarjeta
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
              <Text>No posee turnos cancelados</Text>
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
