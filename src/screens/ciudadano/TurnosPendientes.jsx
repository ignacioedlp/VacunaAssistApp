import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Center,
  FlatList,
  HStack,
  Heading,
  Text,
  Spinner,
  ScrollView
} from "native-base";
import Pendiente from "../../components/PendienteTarjeta";
import { useDispatch, useSelector } from "react-redux";

function TurnosPendientes() {
  const [pendientes, setPendientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.user);
  const ObtenerPendientes = async () => {
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
      "https://vacunassistservices-production.up.railway.app/turnos/pendientes",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setPendientes(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerPendientes();
  }, []);

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <ScrollView>
          <Center w="100%">
            <Center>
              <Heading my="3" fontSize="2xl" color="emerald.700">
                Turnos pendientes
              </Heading>
              <Heading my="3" fontSize="2xl" color="emerald.700">
                {pendientes.length}
              </Heading>
            </Center>
            {pendientes.length > 0 ? (
              <FlatList
                w="100%"
                data={pendientes}
                renderItem={({ item }) => (
                  <Pendiente
                    campania={item.campania}
                    fecha={item.fecha}
                    vacunatorio={item.vacunatorio}
                    estado={item.estado}
                  />
                )}
              />
            ) : (
              <Center>
                <Text>No posee turnos pendientes</Text>
              </Center>
            )}
          </Center>
        </ScrollView>
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

export default TurnosPendientes;
