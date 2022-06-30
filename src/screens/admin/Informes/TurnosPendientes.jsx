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
import jwt_decode from "jwt-decode";

function TurnosPendientes() {
  const [turnosPendientes, setTurnosPendientes] = useState([]);

  const [dateSelected, setDateSelected] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [campaniaSeleccionada, setCampaniaSeleccionada] = useState(null);
  const [turnosADar, setTurnosADar] = useState(0);
  const [turnoMaximos, setTurnoMaximos] = useState(0);

  const getRouteCampania = (data) => {
    switch (data) {
      case "1":
        return "https://vacunassistservices-production.up.railway.app/admin/asignar_fiebre";
      case "2":
        return "https://vacunassistservices-production.up.railway.app/admin/asignar_gripe";
      case "3":
        return "https://vacunassistservices-production.up.railway.app/admin/asignar_covid";
    }
  };

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
    const fechahoy = fecha.setDate(fecha.getDate() + 7);
    if (date.getTime() < fecha.getTime()) {
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

    let filtrado = turnosPendientes.filter(
      (item) => item.id_campania.toString() == campania
    );

    setTurnosFiltrados(filtrado);

    setTurnoMaximos(filtrado.length);

    setCampaniaSeleccionada(campania);
  };

  const nombreCampania = (id) => {
    switch (id) {
      case "1":
        return "fiebre amarrilla";
      case "2":
        return "gripe";
      case "3":
        return "covid-19";
    }
  };

  const enviarTurnos = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    var decoded = jwt_decode(value);

    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      num_turnos: turnosADar,
      fecha: dateSelected,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      getRouteCampania(campaniaSeleccionada),
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    Alert.alert(
      "VacunAssist",
      `Se asignaron ${turnosADar} turno/s para la campania de ${nombreCampania(
        campaniaSeleccionada
      )}`
    );
    setIsLoading(false);
    setCampaniaSeleccionada(null);
  };

  const ObtenerTurnosPendientes = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    var decoded = jwt_decode(value);

    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/admin/ver_pendientes",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setTurnosPendientes(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerTurnosPendientes();
  }, []);

  useEffect(() => {
    if (campaniaSeleccionada == null) {
      ObtenerTurnosPendientes();
    }
  }, [campaniaSeleccionada]);

  return (
    <NativeBaseProvider>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {isLoading != true ? (
        <Center w="100%">
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Turnos pendientes
          </Heading>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {(turnosFiltrados == 0) && (campaniaSeleccionada != null)
              ? turnosFiltrados.length
              : turnosPendientes.length}
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
                  <Center w="100%">
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
                          onPress={enviarTurnos}
                          isDisabled={dateSelected ? false : true}
                        >
                          Asignar turnos
                        </Button>
                      </Stack>
                    )}
                  </Center>
                ) : (
                  <Center>
                    <Text>No hay turnos pendientes</Text>
                  </Center>
                )
              ) : (
                null
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
