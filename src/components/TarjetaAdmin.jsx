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

function TarjetaAdministrador() {
  return (
    <Box p="20px">
      <Box
        maxW="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="red.500"
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
            <Center>

            
                <Heading size="md" ml="-1">
                Sos administrador
                </Heading>
            </Center>
          </Stack>
          <VStack space={4} justifyContent="space-between">
            <Center>
                <Text>
                    Proximamente más funcionalidades.
                </Text>
            </Center>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default TarjetaAdministrador;