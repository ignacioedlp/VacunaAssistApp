import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Input,
  Center,
  Stack,
  Select,
  NativeBaseProvider,
  Button,
  Text,
  FlatList,
  Box,
  CheckIcon,
  Pressable,
  Heading,
} from "native-base";
import TurnoDelDia from "../components/TurnoDeHoyTarjeta";

function TurnosDelDiaScreen({ navigation }) {
  const [turnos, setTurnos] = useState([]);
  const [campania, setCampania] = useState("");
  const [cargado, setCargado] = useState(false);
  const handlerChangeCampania = (campania) => setCampania(campania);

  const ObtenerListaVacunar = async () => {
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
    const token =
      "Bearer " +
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjExMTExMTEyLCJyb2wiOiJWYWN1bmFkb3IiLCJleHAiOjE2NTM5NTE3NDd9.vGYrg0LMRTJM-8goY6rlDg1xFySBjErtkT49sg3hfgg";
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      campania: campania,
      vacunatorio: 2,
      date: "2022-05-29",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/vacunador/ver_listado",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setTurnos(res);
    setCargado(true);
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Turnos del dia
          </Heading>
        </Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Select
            minWidth="200"
            selectedValue={campania}
            accessibilityLabel="Campaña"
            onValueChange={(itemValue) => handlerChangeCampania(itemValue)}
            placeholder="Vacunatorio"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Fiebre amarilla" value="1" />
            <Select.Item label="Gripe" value="2" />
            <Select.Item label="Covid-19" value="3" />
          </Select>
          <Button colorScheme="green" onPress={() => ObtenerListaVacunar()}>
            Obtener listado
          </Button>
        </Stack>
        {cargado != false ? (
          turnos.length > 0 ? (
            <FlatList
              data={turnos}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Cargar datos", {
                      dni: item.dni,
                      id_campania: campania,
                      idTurno: item.nroTurno,
                    })
                  }
                >
                  <TurnoDelDia
                    fecha={item.fecha}
                    nroTurno={item.nroTurno}
                    nombreYApellido={item.nombreYApellido}
                    dni={item.dni}
                  />
                </Pressable>
              )}
            />
          ) : (
            <Text>No hay turnos para esa campaña</Text>
          )
        ) : (
          <Text>Selecciona una campaña</Text>
        )}
      </Center>
    </NativeBaseProvider>
  );
}

export default TurnosDelDiaScreen;
