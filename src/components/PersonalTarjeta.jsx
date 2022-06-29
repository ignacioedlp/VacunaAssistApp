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

function PersonalTarjeta({ dni, nombre, apellido, rol, vacunatorio }) {
  const nombreDeVacunatorio = (id) => {
    switch (id.toString()) {
      case "1":
        return "Hospital 9 de Julio";
      case "2":
        return "Corralon municipal";
      case "3":
        return "Polideportivo";
    }
  };

  return (
    <Box p="10px" maxW="100%">
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
              {nombre + " " + apellido}
            </Heading>
          </Stack>
          <VStack space={4} justifyContent="space-between">
            <Text>Dni: {dni}</Text>
            <Text>Rol: {rol}</Text>
            <Text>Vacunatorio: {nombreDeVacunatorio(vacunatorio)}</Text>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default PersonalTarjeta;
