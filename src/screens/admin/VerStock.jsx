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
import Stock from "../../components/StockTarjeta";
import { useDispatch, useSelector } from "react-redux";

function VerStockScreen({ navigation }) {
  const [stocks, setStocks] = useState([]);
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
    setStocks(res);
  };

  useEffect(() => {
    ObtenerStocks();
  });

  return (
    <NativeBaseProvider>
      <Center>
        <Heading size="lg" ml="-1" p="10px">
          Stocks cargados
        </Heading>
      </Center>
      {stocks.length > 0 ? (
        <Center>
          <Stack mt={3} space={4} w="100%" maxW="100%">
            <Center></Center>
            <Stock data={stocks[0]} navigation={navigation} />
            <Stock data={stocks[1]} navigation={navigation} />
            <Stock data={stocks[2]} navigation={navigation} />
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

export default VerStockScreen;
