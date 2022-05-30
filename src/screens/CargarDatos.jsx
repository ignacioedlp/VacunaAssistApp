import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Heading,
  HStack,
  Spinner,
  Box,
} from "native-base";

function CargarDatosScreen({ route, navigation }) {
  const { dni, id_campania, idTurno } = route.params;
  const [nro_lote, setNro_lote] = useState("");
  const [marca, setMarca] = useState("");
  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerNro_lote = (nro) => setNro_lote(nro);
  const handlerMarca = (marca) => setMarca(marca);

  const cargarDatos = async () => {
    if (marca != '' && nro_lote != '') {
      setIsLoading(true);
      var myHeaders = new Headers();
      const value = await AsyncStorage.getItem("@JWTUSER");
      const token =
        "Bearer " +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjExMTExMTEyLCJyb2wiOiJWYWN1bmFkb3IiLCJ2YWN1bmF0b3JpbyI6MiwiZXhwIjoxNjU0MTA3NDQ3fQ.n5at2_XmsfPLsm--mypsRlSiD6EHUYp28lhVuZNotaQ";
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id_campania: id_campania,
        id_usuario: dni,
        nro_lote: parseInt(nro_lote),
        marca: marca,
        desconocido: false,
        id_turno: idTurno,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "https://vacunassistservices-production.up.railway.app/vacunador/cargar_datos",
        requestOptions
      ).catch((error) => console.log("error", error));
      const res = await result.json();
      setCargado(true);
      setIsLoading(false);
    } else {
        alert("Faltan rellenar campos");
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Center>
            <Heading size="lg" ml="-1" p="10px">
              Cargar datos del ciudadano {dni}
            </Heading>
          </Center>

          <Input
            onChangeText={handlerNro_lote}
            size="xs"
            value={nro_lote}
            placeholder="Numero del lote"
          />
          <Input
            onChangeText={handlerMarca}
            size="xs"
            value={marca}
            placeholder="Marca de la vacuna"
          />
          <Button
            colorScheme="green"
            onPress={() => cargarDatos()}
            isDisabled={cargado ? true : false}
          >
            Cargar datos
          </Button>
          {isLoading ?? (
            <HStack space={2} justifyContent="center">
              <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
              <Heading color="emerald.500" fontSize="md">
                Cargando datos
              </Heading>
            </HStack>
          )}
          {cargado && (
            <Box>
              <Heading size="lg" ml="-1" p="10px">
                Datos cargados
              </Heading>
              <Button
                colorScheme="green"
                onPress={() => navigation.navigate("Listado de turnos")}
              >
                Volver
              </Button>
            </Box>
          )}
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default CargarDatosScreen;
