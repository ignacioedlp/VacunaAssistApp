import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Center,
  Spinner,
  Stack,
  Heading,
  Text,
  HStack,
  Select,
  CheckIcon,
  FlatList,
  Button,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";

function TurnosPendientes() {
  const [turnosPendientes, setTurnosPendientes] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [campaniaSeleccionada, setCampaniaSeleccionada] = useState(null);
  const [turnosADar, setTurnosADar] = useState(0);
  const [turnoMaximos, setTurnoMaximos] = useState(0);

  const handleChangeCampania = (campania) => {
    //obtener la cantidad de turnos de la campania seleccionada

    let cantidad = turnosPendientes.filter(
      (item) => item.idCampania.toString() == campania
    );
    setTurnoMaximos(cantidad.length);

    setCampaniaSeleccionada(campania);
  };

  const ObtenerTurnosPendientes = async () => {
    // var myHeaders = new Headers();
    // const value = userData.token;
    // const token = "Bearer " + value;
    // var decoded = jwt_decode(value);

    // myHeaders.append("Authorization", token);
    // myHeaders.append("Content-Type", "application/json");
    // var raw = ""

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // const result = await fetch(
    //   "https://vacunassistservices-production.up.railway.app/vacunador/ver_listado",
    //   requestOptions
    // ).catch((error) => console.log("error", error));
    // const res = await result.json();
    // setTurnosCancelados(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerTurnosPendientes();
  });

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Turnos pendientes
          </Heading>
          <Select
            minWidth="200"
            selectedValue={campaniaSeleccionada}
            accessibilityLabel="Campaña"
            onValueChange={(itemValue) => handleChangeCampania(itemValue)}
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
          {turnosPendientes.length > 0 ? (
            <Stack px="10px">
              {campaniaSeleccionada != null && (
                <Center>
                  <Heading mt="3">Turnos a dar : {turnosADar}</Heading>
                  <Slider
                    style={{ width: 200, height: 100 }}
                    minimumValue={1}
                    maximumValue={turnoMaximos}
                    minimumTrackTintColor="#50c878"
                    maximumTrackTintColor="#000000"
                    value={turnosADar}
                    onValueChange={(cantidad) =>
                      setTurnosADar(Math.round(cantidad))
                    }
                  />
                </Center>
              )}
              {campaniaSeleccionada != null && turnosADar > 0 && (
                <Button onPress={() => navigation.navigate("/admin/historial")}>
                  Asignar turnos
                </Button>
              )}
              <FlatList
                data={turnos}
                renderItem={({ item }) =>
                  campaniaSeleccionada == null ? (
                    <Heading>item</Heading>
                  ) : (
                    item.campania.toString().includes(campaniaSeleccionada) && (
                      <Heading>item</Heading>
                    )
                  )
                }
              />
            </Stack>
          ) : (
            <Text>No hay turnos para esa campaña</Text>
          )}
        </Center>
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
