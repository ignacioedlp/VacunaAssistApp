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
import { useDispatch, useSelector } from "react-redux";

function CargarDatosScreen({ route, navigation }) {
  const { dni, nombre, id_campania, idTurno } = route.params;
  const [nro_lote, setNro_lote] = useState("");
  const [marca, setMarca] = useState("");
  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerNro_lote = (nro) => setNro_lote(nro);
  const handlerMarca = (marca) => setMarca(marca);
  const userData = useSelector((state) => state.user);

  const cargarDatos = async () => {
    if (marca != "" && nro_lote != "") {
      setIsLoading(true);
      var myHeaders = new Headers();
      const value = userData.token;
      const token = "Bearer " + value;
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
            <Heading my="3" fontSize="2xl" color="emerald.700">
              Cargar datos del ciudadano {nombre}
            </Heading>
          </Center>

          <Input
            onChangeText={handlerNro_lote}
            size="md"
            value={nro_lote}
            placeholder="Numero del lote"
          />
          <Input
            onChangeText={handlerMarca}
            size="md"
            value={marca}
            placeholder="Marca de la vacuna"
          />
          {!isLoading && (
            <Button
              colorScheme="green"
              onPress={() => cargarDatos()}
              isDisabled={cargado ? true : false}
            >
              Cargar datos
            </Button>
          )}
          {isLoading && (
            <HStack space={2} justifyContent="center" marginTop={5}>
              <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
              <Heading color="emerald.500" fontSize="md">
                Cargando datos
              </Heading>
            </HStack>
          )}
          {cargado && (
            <Center>
              <Box>
                <Heading size="lg" ml="-1" p="10px">
                  Datos cargados
                </Heading>

                <Button
                  colorScheme="green"
                  onPress={() => navigation.navigate("/home")}
                >
                  Volver
                </Button>
              </Box>
            </Center>
          )}
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default CargarDatosScreen;
