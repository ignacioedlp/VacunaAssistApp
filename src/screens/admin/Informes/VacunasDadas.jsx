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
} from "native-base";

import { useDispatch, useSelector } from "react-redux";

function VacunasDadas() {
  const [vacunasDadas, setVacunasDadas] = useState([]);
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const ObtenerVacunasDadas = async () => {
    // var myHeaders = new Headers();
    // const value = userData.token;
    // const token = "Bearer " + value;
    // myHeaders.append("Authorization", token);
    // var raw = "";

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // const result = await fetch(
    //   "https://vacunassistservices-production.up.railway.app/admin/ver_stock",
    //   requestOptions
    // ).catch((error) => console.log("error", error));
    // const res = await result.json();
    // setVacunasDadas(res);
    setIsLoading(false);
  };

  useEffect(() => {
    ObtenerVacunasDadas();
  });

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Vacunas dadas
          </Heading>
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
