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
  Box,
} from "native-base";
import CompletadosTarjeta from "../../../components/CompletadosTarjeta";
import CompletadosTotales from "../../../components/CompletadosTotales";
import { useDispatch, useSelector } from "react-redux";

function VacunasDadas() {
  const [isLoading, setIsLoading] = useState(true);
  const [vacunasDadas, setVacunasDadas] = useState([]);
  const [vacunasPorCampania, setVacunasPorCampania] = useState();

  const userData = useSelector((state) => state.user);

  const ObtenerStocks = async () => {
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
      "https://vacunassistservices-production.up.railway.app/admin/mostrar_vacunas_dadas",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setVacunasDadas(res);
    setVacunasPorCampania(CalcularTotalesCampania(res));
    setIsLoading(false);
  };

  const CalcularTotalesCampania = (res) => {
    let gripe = 0;
    let covid = 0;
    let fiebre = 0;
    for (let index = 0; index < res.length; index++) {
      fiebre += res[index].completados_fiebre.completados;
      gripe += res[index].completados_gripe.completados;
      covid += res[index].completados_covid.completados;
    }

    return { gripe, covid, fiebre };
  };

  useEffect(() => {
    ObtenerStocks();
  }, []);

  return (
    <NativeBaseProvider>
      <Center>
        <Heading size="lg" ml="-1" p="10px">
          Vacunas dadas
        </Heading>
      </Center>
      {!isLoading ? (
        <Center>
          <Stack mt={3} space={4} w="100%" maxW="100%">
            <CompletadosTarjeta data={vacunasDadas[0]} />
            <CompletadosTarjeta data={vacunasDadas[1]} />
            <CompletadosTarjeta data={vacunasDadas[2]} />
            <CompletadosTotales vacunasPorCampania={vacunasPorCampania} />
            <Box mx="45px" p="2">
              <Box
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: "gray.50",
                }}
              >
                <Stack p="4" space={2}>
                  <Stack space={2}>
                    <Center>
                      <Heading size="md" ml="-1">
                        Totales
                      </Heading>
                    </Center>
                  </Stack>

                  <Center>
                    <HStack alignItems="space-between" space={4}>
                      <HStack alignItems="center">
                        <Text pt="10px">
                          {vacunasPorCampania.gripe +
                            vacunasPorCampania.covid +
                            vacunasPorCampania.fiebre}
                        </Text>
                      </HStack>
                    </HStack>
                  </Center>
                </Stack>
              </Box>
            </Box>
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

export default VacunasDadas;
