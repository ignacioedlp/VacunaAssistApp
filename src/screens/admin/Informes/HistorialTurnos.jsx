import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart, StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  NativeBaseProvider,
  Center,
  Spinner,
  Stack,
  Heading,
  Text,
  HStack,
  FlatList,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import TurnoTarjeta from "../../../components/TurnoTarjeta";
import moment from "moment";
import ChartBar from "../../../components/ChartBar";
const screenWidth = Dimensions.get("window").width - 20;

function HistorialTurnos() {
  const [turnos, setTurnos] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [semana, setSemana] = useState([0, 0, 0, 0, 0]);

  const ObtenerTurnos = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/admin/ver_turnos",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setTurnos(res);
    armarArreglo(res);
    setIsLoading(false);
  };

  const obtenerDiaDeLaSemana = (dia) => {
    return moment(dia).isoWeekday();
  };

  const armarArreglo = (data) => {
    const semana = [0, 0, 0, 0, 0];

    for (let i = 0; i < data.length; i++) {
      let dia = obtenerDiaDeLaSemana(data[i].fecha);
      if (dia != 6 && dia != 7) {
        semana[dia - 1] += 1;
      }
    }

    setSemana(semana);
  };

  useEffect(() => {
    ObtenerTurnos();
  }, []);

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `#000000`,
    labelColor: (opacity = 1) => `#000000`,
    style: {
      borderRadius: 16,
      p: 2,
    },
  };

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Turnos
          </Heading>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {turnos.length}
          </Heading>
          <Stack>
            <LineChart
              data={{
                labels: ["L", "M", "M", "J", "V"],
                datasets: [
                  {
                    data: semana,
                  },
                ],
              }}
              width={screenWidth} // from react-native
              height={220}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#24ad25",
                backgroundGradientFrom: "#24ad25",
                backgroundGradientTo: "#24ad25",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",

                  stroke: "#68c7c8",
                },
              }}
              bezier
              style={{
                marginVertical: 8,

                borderRadius: 16,
              }}
            />
          </Stack>
          {turnos.length == 0 && (
            <Center>
              <Text>No posee turnos </Text>
            </Center>
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

export default HistorialTurnos;
