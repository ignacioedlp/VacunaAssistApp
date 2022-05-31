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

function Historial({ campania, marca, fecha, lote }) {
  const fechaTurno = new Date(fecha);
  fechaTurno.setMonth(fechaTurno.getMonth() + 1);
  return (
    <Box p="20px">
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
        <Stack p="4" space={5}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {campania}
            </Heading>
          </Stack>
          <VStack space={4} justifyContent="space-between">
            <Text>
              Fecha:{new Date(fecha).getUTCDate() +"/"+ fechaTurno.getMonth() +"/"+  new Date(fecha).getUTCFullYear() }
            </Text>
            <Text>Marca: {marca}</Text>
            <Text>Nro lote: {lote}</Text>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Historial;
