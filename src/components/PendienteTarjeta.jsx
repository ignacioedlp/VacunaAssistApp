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

function Pendiente({ campania, vacunatorio, fecha, estado }) {
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
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {campania}
            </Heading>
          </Stack>
          <VStack space={4} justifyContent="space-between">
            {estado == "Asignado" ? (
              <Text>
                Fecha:
                {new Date(fecha).getUTCDate() +
                  "/" +
                  fechaTurno.getMonth() +
                  "/" +
                  new Date(fecha).getUTCFullYear()}
              </Text>
            ) : (
              <Text>Pendiente de asignacion</Text>
            )}
            <Text>Vacunatorio: {vacunatorio}</Text>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Pendiente;
