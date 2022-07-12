import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import {
  NativeBaseProvider,
  Center,
  Spinner,
  Stack,
  Heading,
  Box,
  HStack,
  ScrollView,
  Button,
  View,
} from "native-base";
// import CompletadosTarjeta from "../../../components/CompletadosTarjeta";
// import CompletadosTotales from "../../../components/CompletadosTotales";
import { useDispatch, useSelector } from "react-redux";
import ChartBar from "../../../components/ChartBar";
import moment from "moment";
import { Alert } from "react-native";

function VacunasDadas() {
  const [vacunasObtenidas, setVacunasObtenidas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vacunasDadas, setVacunasDadas] = useState([]);
  const [vacunasPorCampania, setVacunasPorCampania] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [correcto, setCorrecto] = useState(false);
  const [vacunatorios, setVacunatorios] = useState([]);

  const openDatePicker = () => {
    setShowDatePicker(true);
    setVacunasDadas([]);
    setVacunasObtenidas(false);
  };

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false);
  };

  const onConfirm = (output) => {
    // You should close the modal in here
    if (moment(output.endDate).diff(moment(output.startDate), "days") < 6) {
      Alert.alert(
        "VacunAssist",
        "La cantidad minima de dias debe de ser una semana"
      );
    } else {
      setShowDatePicker(false);
      // The parameter 'output' is an object containing date and dateString (for single mode).
      // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
      setStartDate(output.startDateString);
      setEndDate(output.endDateString);
      setCorrecto(true);
    }
  };

  const userData = useSelector((state) => state.user);

  const ObtenerVacunasDadas = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      fecha_ini: startDate,
      fecha_fin: endDate,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/admin/mostrar_vacunas_dadas",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    console.log("vacunatorios traidos:", res.length);
    for (let i = 0; i < res.length; i++) {
      crearDatos(res[i].dias, i);
    }
    setVacunasObtenidas(true);
    setVacunasDadas(res);
  };

  const crearDatos = (datos, index) => {
    const dias = [];
    const vacunatoriosAux = vacunatorios;

    for (let i = 0; i < datos.length; i++) {
      var dia = [];

      dia.push(datos[i].prom_fiebre);
      dia.push(datos[i].prom_gripe);
      dia.push(datos[i].prom_covid);

      dias.push(dia);
    }

    const data = {
      labels: ["L", "M", "M", "J", "V"],
      legend: ["Fiebre", "Gripe", "Covid"],
      data: dias,
      barColors: ["#8ad972", "#b3e6a1", "#daf3d0"],
    };

    vacunatoriosAux.push(data);
    setVacunatorios(vacunatoriosAux);
  };

  const obtenerDatosCampania = (datos, index) => {
    const semana = {
      data: [],
    };

    for (let i = 0; i < datos.length; i++) {
      semana.data.push(datos[i][index]);
    }

    return {
      labels: ["L", "M", "M", "J", "V"],
      datasets: [semana],
    };
  };

  useEffect(() => {}, []);

  return (
    <NativeBaseProvider bg="white">
      {!isLoading ? (
        <ScrollView
          bg="white"
          h="100%"
          _contentContainerStyle={{
            mb: "4",
            minW: "72",
          }}
        >
          <Center>
            <Heading my="3" fontSize="2xl" color="emerald.700">
              Promedio de vacunas dadas
            </Heading>
          </Center>

          {vacunatorios.length == 0 && <Center>
            <Button
              mt="3"
              w="150px"
              h="50px"
              colorScheme="green"
              onPress={openDatePicker}
            >
              Elegir fecha inicio
            </Button>
          </Center>}

          <DatePicker
            isVisible={showDatePicker}
            mode={"range"}
            onCancel={onCancel}
            onConfirm={onConfirm}
            maxDate={new Date()}
          />

          {endDate != null && correcto && (
            vacunatorios.length == 0 && <Center>
              <Button
                mt="3"
                w="150px"
                h="50px"
                colorScheme="green"
                onPress={ObtenerVacunasDadas}
              >
                Obtener informe
              </Button>
            </Center>
          )}
          {vacunasObtenidas && vacunasDadas.length > 0 && (
            <Stack >
              <ChartBar
                vacunatorio={vacunasDadas[0].nombre}
                campania={"Fiebre"}
                datos={obtenerDatosCampania(vacunatorios[0].data, 0)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[0].nombre}
                campania={"Gripe"}
                datos={obtenerDatosCampania(vacunatorios[0].data, 1)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[0].nombre}
                campania={"Covid"}
                datos={obtenerDatosCampania(vacunatorios[0].data, 2)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[1].nombre}
                campania={"Fiebre"}
                datos={obtenerDatosCampania(vacunatorios[1].data, 0)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[1].nombre}
                campania={"Gripe"}
                datos={obtenerDatosCampania(vacunatorios[1].data, 1)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[1].nombre}
                campania={"Covid"}
                datos={obtenerDatosCampania(vacunatorios[1].data, 2)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[2].nombre}
                campania={"Fiebre"}
                datos={obtenerDatosCampania(vacunatorios[2].data, 0)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[2].nombre}
                campania={"Gripe"}
                datos={obtenerDatosCampania(vacunatorios[2].data, 1)}
              />
              <ChartBar
                vacunatorio={vacunasDadas[2].nombre}
                campania={"Covid"}
                datos={obtenerDatosCampania(vacunatorios[2].data, 2)}
              />
            </Stack>
          )}
        </ScrollView>
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

export default VacunasDadas;
