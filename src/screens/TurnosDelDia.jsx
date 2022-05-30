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
import jwt_decode from "jwt-decode";

function TurnosDelDiaScreen({ navigation }) {
  const [turnos, setTurnos] = useState([]);
  const [campania, setCampania] = useState("");
  const [cargado, setCargado] = useState(false);
  const handlerChangeCampania = (campania) => setCampania(campania);
  const [dni, setDni] = useState();
  const handlerChangeDni = (dni) => setDni(dni);

  const ObtenerListaVacunar = async () => {
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
    const token =
      "Bearer " +
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjExMTExMTEyLCJyb2wiOiJWYWN1bmFkb3IiLCJ2YWN1bmF0b3JpbyI6MiwiZXhwIjoxNjU0MTA3NDQ3fQ.n5at2_XmsfPLsm--mypsRlSiD6EHUYp28lhVuZNotaQ";
      var decoded = jwt_decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkbmkiOjExMTExMTEyLCJyb2wiOiJWYWN1bmFkb3IiLCJ2YWN1bmF0b3JpbyI6MiwiZXhwIjoxNjU0MTA3NDQ3fQ.n5at2_XmsfPLsm--mypsRlSiD6EHUYp28lhVuZNotaQ");
      console.log(decoded);
      myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      campania: campania,
      vacunatorio: decoded.vacunatorio,
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
      <Center pt="150px">
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
        <Input m="20px" placeholder="Buscar por dni" value={dni} onChangeText={handlerChangeDni} type="number"/>
        {cargado != false ? (
          turnos.length > 0 ? (
            <Stack px="10px">
              <FlatList
                data={turnos}
                renderItem={({ item }) => (
                  dni == null ? (
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
                  ) : (
                    item.dni.toString().includes(dni.toString()) &&
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
                  )
                )}
              />
            </Stack>
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
