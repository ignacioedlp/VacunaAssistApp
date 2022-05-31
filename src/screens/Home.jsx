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
  View,
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

  const nav = [
    {
      id: 1,
      nombre: "Turnos pendientes",
      action: () => navigation.navigate("Turnos pendientes"),
    },
    {
      nombre: "Mis vacunas",
      id: 2,
      action: () => navigation.navigate("Historial"),
    },
    {
      id: 3,
      nombre: "Ver listado",
      action: () => navigation.navigate("Listado de turnos"),
    },
    {
      id: 4,
      nombre: "Cerrar sesion",
      action: () => navigation.navigate("Logout"),
    },
  ];

  return (
    <NativeBaseProvider>
      <Center>
        <FlatList
          top={1}
          padding={"2px"}
          data={nav}
          horizontal={true}
          renderItem={({ item }) => (
            <Button
              margin={1}
              _text={{ fontSize: 12 }}
              w="90px"
              onPress={item.action}
              colorScheme={item.nombre == "Cerrar sesion" ? "red" : "green"}
            >
              {item.nombre}
            </Button>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
      <Center>
        <Stack mt={3} space={4} w="100%" maxW="100%">
          <Center>
            <Heading pt="27px" size="md" ml="-1">
              Campañas
            </Heading>
          </Center>
          <FlatList
            padding={"4px"}
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
