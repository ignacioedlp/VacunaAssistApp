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
} from "native-base";

import { useDispatch, useSelector } from "react-redux";

function Informes({ navigation }) {
  return (
    <NativeBaseProvider>
      <Center>
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Informes
          </Heading>
        </Center>
        <Stack space="2">
          <Button
            colorScheme="green"
            onPress={() => navigation.navigate("/admin/turnosCancelados")}
          >
            Turnos cancelados
          </Button>
          <Button
            colorScheme="green"
            onPress={() => navigation.navigate("/admin/turnosPendientes")}
          >
            Turnos pendientes
          </Button>
          <Button
            colorScheme="green"
            onPress={() => navigation.navigate("/admin/vacunasDadas")}
          >
            Vacunas dadas
          </Button>
          <Button
            colorScheme="green"
            onPress={() => navigation.navigate("/admin/vacunasSobrantes")}
          >
            Vacunas sobrantes
          </Button>
          <Button
            colorScheme="green"
            onPress={() => navigation.navigate("/admin/historial")}
          >
            Historial de turnos
          </Button>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default Informes;
