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
  Stack,
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
      {isLoading ? (
        <HStack space={2} justifyContent="center" marginTop={5}>
          <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
          <Heading color="emerald.500" fontSize="md">
            Cargando datos
          </Heading>
        </HStack>
      ) : (
        <Center w="100%">
          <Center>
            <Heading my="3" fontSize="2xl" color="emerald.700">
              Historial de vacunacion
            </Heading>
            <HStack justifyContent="center" alignItems="center">
              <Stack
                mx="1"
                p="2"
                alignItems="center"
                borderColor="emerald.700"
                borderWidth={2}
                borderRadius={3}
              >
                <Heading fontSize="lg" color="emerald.700">
                  Aplicadas:{" "}
                  {
                    historial.filter((item) => item.estado != "Cancelado")
                      .length
                  }
                </Heading>
              </Stack>
              <Stack
                mx="1"
                p="1"
                alignItems="center"
                borderColor="red.700"
                borderWidth={2}
                borderRadius={3}
              >
                <Heading my="1" fontSize="lg" color="red.700">
                  Canceladas:{" "}
                  {
                    historial.filter((item) => item.estado == "Cancelado")
                      .length
                  }
                </Heading>
              </Stack>
            </HStack>
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
      )}
    </NativeBaseProvider>
  );
}

export default HistorialVacunacion;
