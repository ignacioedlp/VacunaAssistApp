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

function SumarStockScreen({ route, navigation }) {
  const { id_campania, id_vacunatorio } = route.params;
  const [stock, setStock] = useState(0);
  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerStock = (nro) => setStock(nro);

  const userData = useSelector((state) => state.user);

  const cargarDatos = async () => {
    if (stock > 0) {
      setIsLoading(true);
      var myHeaders = new Headers();
      const value = userData.token;
      const token = "Bearer " + value;
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id_vacunatorio: id_vacunatorio,
        stock: stock,
        id_campania: id_campania,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "https://vacunassistservices-production.up.railway.app/admin/sumar_stock",
        requestOptions
      ).catch((error) => console.log("error", error));
      const res = await result.json();
      setCargado(true);
      setIsLoading(false);
    } else {
      alert("No puede ingresar una cantidad inferior a 0");
    }
  };

  const getVacunatorio = (data) => {
    switch (data) {
      case 1:
        return "Hospital 9 de Julio";
      case 2:
        return "Corralon Municipal";
      case 3:
        return "Polideportivo";
    }
  };
  const getCampania = (data) => {
    switch (data) {
      case 1:
        return "Fiebre Amarilla";
      case 2:
        return "Gripe";
      case 3:
        return "Covid";
    }
  };
  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Center>
            <Heading size="lg" ml="-1" p="10px">
              Vacunatorio: {getVacunatorio(route.params.id_vacunatorio)}.
              Campaña: {getCampania(route.params.id_campania)}
            </Heading>
          </Center>
          <Input
            onChangeText={handlerStock}
            size="md"
            value={stock}
            placeholder="Ingrese el stock"
          />

          <Button colorScheme="green" onPress={() => cargarDatos()}>
            Sumar Stock
          </Button>
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

export default SumarStockScreen;
