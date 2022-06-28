import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
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
import TurnoPendientesTarjeta from "../../../components/TurnoPendienteTarjeta";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function TurnosPendientes() {
  const [turnosPendientes, setTurnosPendientes] = useState([
    {
      dni: "44444443",
      vacunatorio: "Corralon",
      campania: "1",
      nombreYApellido: "Nova",
      fecha: Date.now(),
      nroTurno: 333,
    },
  ]);

  const [dateSelected, setDateSelected] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [campaniaSeleccionada, setCampaniaSeleccionada] = useState(null);
  const [turnosADar, setTurnosADar] = useState(0);
  const [turnoMaximos, setTurnoMaximos] = useState(0);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    //Si la fecha seleccionada que hoy no inicializa la fecha y lanza un mensaje
    const fecha = new Date(); //fecha desde hoy sumados 7 dias
    // acomodar la fecha que seleccionada
    fecha.setDate(fecha.getDate() + 7);
    if (
      date.getTime() < fecha.getTime() ||
      (fecha.getDay() == date.getDay() && fecha.getMonth() == date.getMonth())
    ) {
      Alert.alert(
        "Error",
        "Seleccione una fecha posterior a 7 dias apartir de hoy"
      );
      hideDatePicker();
    } else {
      setDateSelected(date);
      hideDatePicker();
    }
  };

  const handleChangeCampania = (campania) => {
    //obtener la cantidad de turnos de la campania seleccionada

    let filtrado = turnosPendientes.filter((item) => item.campania == campania);

    setTurnosFiltrados(filtrado);

    setTurnoMaximos(filtrado.length);

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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {isLoading != true ? (
        <Center>
          <Heading size="lg" ml="-1" py="10px">
            Turnos pendientes
          </Heading>
          <Select
            minWidth="80%"
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
            <Stack w="100%">
              {campaniaSeleccionada != null ? (
                turnosFiltrados.length > 0 ? (
                  <Center>
                    <Heading mt="3">Turnos a dar : {turnosADar}</Heading>
                    <Slider
                      style={{ width: 200, height: 100 }}
                      minimumValue={0}
                      maximumValue={turnoMaximos}
                      minimumTrackTintColor="#50c878"
                      maximumTrackTintColor="#000000"
                      value={turnosADar}
                      onValueChange={(cantidad) =>
                        setTurnosADar(Math.round(cantidad))
                      }
                    />
                    {dateSelected && (
                      <Heading>
                        Asignar turnos para el{" "}
                        {
                          /* {Muestro la fecha si selecciono una fecha} */
                          dateSelected.getUTCDate() +
                            " - " +
                            (dateSelected.getMonth() + 1) +
                            " - " +
                            dateSelected.getFullYear()
                        }
                      </Heading>
                    )}
                    {turnosADar > 0 && (
                      <Stack>
                        <Button
                          my="2"
                          colorScheme="green"
                          onPress={showDatePicker}
                        >
                          Elegir fecha
                        </Button>
                        <Button
                          colorScheme="green"
                          isDisabled={dateSelected ? false : true}
                        >
                          Asignar turnos
                        </Button>
                      </Stack>
                    )}
                    <FlatList
                      w="100%"
                      maxW="300px"
                      data={turnosFiltrados}
                      renderItem={({ item }) => (
                        <TurnoPendientesTarjeta
                          nombreYApellido={item.nombreYApellido}
                          nroTurno={item.nroTurno}
                          fecha={item.fecha}
                          vacunatorio={item.vacunatorio}
                          dni={item.dni}
                          campania={item.campania}
                        />
                      )}
                    />
                  </Center>
                ) : (
                  <Center>
                    <Text>No hay turnos pendientes</Text>
                  </Center>
                )
              ) : (
                <Center>
                  <FlatList
                    w="75%"
                    maxW="300px"
                    data={turnosPendientes}
                    renderItem={({ item }) => (
                      <TurnoPendientesTarjeta
                        nombreYApellido={item.nombreYApellido}
                        nroTurno={item.nroTurno}
                        fecha={item.fecha}
                        vacunatorio={item.vacunatorio}
                        dni={item.dni}
                        campania={item.campania}
                      />
                    )}
                  />
                </Center>
              )}
            </Stack>
          ) : (
            <Text>No hay turnos pendientes</Text>
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
