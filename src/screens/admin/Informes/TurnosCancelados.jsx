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
  FlatList,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import TurnoCanceladoTarjeta from "../../../components/TurnoCanceladoTarjeta";
const screenWidth = Dimensions.get("window").width - 20;
import { LineChart, StackedBarChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function TurnosCancelados() {
  const [turnosCancelados, setTurnosCancelados] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelados, setCancelados] = useState([0, 0, 0]);

  const ObtenerTurnosCancelados = async () => {
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
      "https://vacunassistservices-production.up.railway.app/admin/ver_cancelados",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setTurnosCancelados(res);
    armarArreglo(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerTurnosCancelados();
  }, []);

  const obtenerNumeroCamp = (turno) => {
    switch (turno.campania) {
      case "Gripe":
        return 1;
      case "Covid-19":
        return 0;
      case "Fiebre amarilla":
        return 2;
    }
  };

  const armarArreglo = (data) => {
    const cancelados = [0, 0, 0]; //covid , fiebre, gripe

    for (let i = 0; i < data.length; i++) {
      let index = obtenerNumeroCamp(data[i]);
      cancelados[index] += 1;
    }

    setCancelados(cancelados);
  };

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center w="100%">
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Turnos cancelados
          </Heading>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            {turnosCancelados.length}
          </Heading>
          <Stack>
            {/* <BarChart
              data={{
                labels: ["Covid", "Fiebre", "Gripe"],
                datasets: [
                  {
                    data: cancelados,
                  },
                ],
              }}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: "#24ad25",
                backgroundGradientFrom: "#24ad25",
                backgroundGradientTo: "#24ad25",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,

                borderRadius: 16,
              }}
            /> */}
          </Stack>
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

export default TurnosCancelados;
