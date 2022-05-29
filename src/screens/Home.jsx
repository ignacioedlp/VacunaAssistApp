import React, { useState } from "react";
import {
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  HStack,
  Heading,
  FlatList,
  Spinner,
} from "native-base";
import Campania from "../components/CampaniaTarjeta";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const handlerSolicitarFiebre = async () => {
    setIsLoading(true);
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

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/fiebre_amarrilla",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if ((result.code = 200)) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const handlerSolicitarGripe = async () => {
    setIsLoading(true);
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

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/gripe",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if ((result.code = 200)) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const handlerSolicitarCovid = async () => {
    setIsLoading(true);
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

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/covid",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if ((result.code = 200)) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const campanias = [
    {
      id: 1,
      nombre: "Gripe",
      action: handlerSolicitarGripe,
    },
    {
      id: 2,
      nombre: "Fiebre Amarilla",
      action: handlerSolicitarFiebre,
    },
    {
      id: 3,
      nombre: "Covid-19",
      action: handlerSolicitarCovid,
    },
  ];

  return (
    <NativeBaseProvider>
      <Center>
        <Button
          onPress={() => navigation.navigate("Turnos pendientes")}
          colorScheme="green"
        >
          Turnos pendientes
        </Button>
        <Button
          onPress={() => navigation.navigate("Historial")}
          colorScheme="green"
        >
          Mis vacunas
        </Button>
        <Button
          onPress={() => navigation.navigate("Logout")}
          colorScheme="green"
        >
          Cerrar sesion
        </Button>
        <Button
          onPress={() => navigation.navigate("Listado de turnos")}
          colorScheme="green"
        >
          Ver listado
        </Button>
      </Center>
      <Center>
        <Stack mt={3} space={4} w="100%" maxW="100%">
          <Heading size="md" ml="-1" padding={"10px"}>
            Campañas
          </Heading>
          <FlatList
            padding={"4px"}
            horizontal={true}
            data={campanias}
            renderItem={({ item }) => (
              <Campania campania={item.nombre} action={item.action} />
            )}
            keyExtractor={(item) => item.id}
          />
        </Stack>
        {isLoading ?? (
          <HStack space={2} justifyContent="center">
            <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
            <Heading color="emerald.500" fontSize="md">
              Solicitando
            </Heading>
          </HStack>
        )}
      </Center>
    </NativeBaseProvider>
  );
}

export default HomeScreen;
