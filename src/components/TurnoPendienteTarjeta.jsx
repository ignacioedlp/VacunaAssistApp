import React from "react";

import {
  Center,
  Stack,
  AspectRatio,
  VStack,
  Text,
  Heading,
  HStack,
  Box,
} from "native-base";

function TurnoPendientesTarjeta({
  dni,
  nombreYApellido,
  nroTurno,
  fecha,
  vacunatorio,
  campania,
}) {
  const fechaTurno = new Date(fecha);
  fechaTurno.setMonth(fechaTurno.getMonth() + 1);

  return (
    <Box p="20px" w="100%">
      <Box
        maxW="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="emerald.500"
        borderWidth="3"
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
        <Stack p="4" space={5} w="100%">
          <VStack space={4} justifyContent="space-between">
            <Text>
              Fecha:{" "}
              {new Date(fecha).getUTCDate() +
                "/" +
                fechaTurno.getMonth() +
                "/" +
                new Date(fecha).getUTCFullYear()}
            </Text>
            <Text>Dni: {dni}</Text>
            <Text>Turno: {nroTurno}</Text>
            <Text>Vacunatorio: {vacunatorio}</Text>
            <Text>Campania: {campania}</Text>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default TurnoPendientesTarjeta;
