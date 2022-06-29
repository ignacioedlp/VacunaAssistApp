import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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
import TurnoDelDia from "../../components/TurnoDeHoyTarjeta";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

function TurnosDelDiaScreen({ navigation }) {
  const [turnos, setTurnos] = useState([]);
  const [campania, setCampania] = useState("");
  const [cargado, setCargado] = useState(false);
  const handlerChangeCampania = (campania) => setCampania(campania);
  const [dni, setDni] = useState();
  const handlerChangeDni = (dni) => setDni(dni);
  const userData = useSelector((state) => state.user);
  const idvacunatorio = parseInt(userData.vacunatorio);

  const verificar_stock = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    var decoded = jwt_decode(value);

    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      campania: parseInt(campania),
      vacunatorio: idvacunatorio,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/vacunador/verificar_stock",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    if (res.code == 200) {
      navigation.navigate("/vacunador/noRegistrada", {
        id_campania: campania,
      });
    } else {
      Alert.alert("VacunAsisst", res.message);
    }
  };

  const ObtenerListaVacunar = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    var decoded = jwt_decode(value);

    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      campania: parseInt(campania),
      vacunatorio: idvacunatorio,
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
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Turnos del dia
          </Heading>
        </Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Select
            minWidth="200"
            selectedValue={campania}
            accessibilityLabel="Campaña"
            onValueChange={(itemValue) => handlerChangeCampania(itemValue)}
            placeholder="Campaña"
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
          <Input
            mb={5}
            size={"lg"}
            placeholder="Buscar por dni"
            value={dni}
            onChangeText={handlerChangeDni}
            type="number"
          />
        </Stack>
        {cargado != false ? (
          turnos.length > 0 ? (
            <Stack px="10px">
              <FlatList
                data={turnos}
                renderItem={({ item }) =>
                  dni == null ? (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("/vacunador/cargarDatos", {
                          nombre: item.nombreYApellido,
                          id_campania: campania,
                          idTurno: item.nroTurno,
                          dni: item.dni,
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
                    item.dni.toString().includes(dni.toString()) && (
                      <Pressable
                        onPress={() =>
                          navigation.navigate("/vacunador/cargarDatos", {
                            nombre: item.nombreYApellido,
                            id_campania: campania,
                            idTurno: item.nroTurno,
                            dni: item.dni,
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
                  )
                }
              />
            </Stack>
          ) : (
            <Text>No hay turnos para esa campaña</Text>
          )
        ) : (
          <Text>Selecciona una campaña</Text>
        )}

        <Button
          mt={3}
          colorScheme="green"
          isDisabled={campania == "" ? true : false}
          onPress={() => verificar_stock()}
        >
          Ingresar persona no registrada
        </Button>
      </Center>
    </NativeBaseProvider>
  );
}

export default TurnosDelDiaScreen;
