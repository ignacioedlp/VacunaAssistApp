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
import Stock from "../../../components/StockTarjeta";
import StockTotales from "../../../components/StockTotales";
import { useDispatch, useSelector } from "react-redux";

function VacunasDadas({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [vacunasDadas, setVacunasDadas] = useState([]);
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
      "https://vacunassistservices-production.up.railway.app/admin/ver_stock",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setVacunasDadas(res);
  };

  useEffect(() => {
    ObtenerStocks();
  });

  return (
    <NativeBaseProvider>
      <Center>
        <Heading size="lg" ml="-1" p="10px">
          Vacunas dadas
        </Heading>
      </Center>
      {vacunasDadas.length > 0 ? (
        <Center>
          <Stack mt={3} space={4} w="100%" maxW="100%">
            <Stock data={vacunasDadas[0]} navigation={navigation} />
            <Stock data={vacunasDadas[1]} navigation={navigation} />
            <Stock data={vacunasDadas[2]} navigation={navigation} />
            <StockTotales data={vacunasDadas[2]} />
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
                        <Text pt="10px">50000</Text>
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
