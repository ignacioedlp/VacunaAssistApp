import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Center,
  NativeBaseProvider,
  FlatList,
  Heading,
  Text,
  Stack,
  Spinner,
  Button,
  HStack,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";

function Informes({ navigation }) {
  return (
    <NativeBaseProvider>
      <Center>
        <Center>
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Informes
          </Heading>
        </Center>
        <HStack space="2">
          <Stack>
            <Button
              colorScheme="green"
              w="150px"
              h="100px"
              onPress={() => navigation.navigate("/admin/turnosCancelados")}
            >
              Turnos cancelados
            </Button>
            <Button
              mt="3"
              w="150px"
              h="100px"
              colorScheme="green"
              onPress={() => navigation.navigate("/admin/turnosPendientes")}
            >
              Turnos pendientes
            </Button>
          </Stack>
          <Stack>
            <Button
              w="150px"
              h="100px"
              colorScheme="green"
              onPress={() => navigation.navigate("/admin/vacunasDadas")}
            >
              Vacunas dadas
            </Button>
            <Button
              mt="3"
              w="150px"
              h="100px"
              colorScheme="green"
              onPress={() => navigation.navigate("/admin/historial")}
            >
              Historial de turnos
            </Button>
          </Stack>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default Informes;
