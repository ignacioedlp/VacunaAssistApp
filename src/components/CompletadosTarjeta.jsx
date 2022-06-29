import React from "react";

import {
  Center,
  Stack,
  AspectRatio,
  Text,
  Heading,
  HStack,
  Box,
} from "native-base";

function CompletadosTarjeta({ data }) {
  return (
    <Box mx="20px" p="1">
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
        <Stack p="4" space={2}>
          <Stack space={2}>
            <Center>
              <Heading size="lg" ml="-1">
                {data.vacunatorio.nombre}
              </Heading>
            </Center>
          </Stack>

          <Center>
            <HStack alignItems="space-between" space={4}>
              <HStack alignItems="center">
                <Stack>
                  <Center>
                    <Heading size="lg" pt="5px" ml="-1">
                      {"Gripe"}
                    </Heading>
                    <Text pt="5px" fontSize="2xl">
                      {data.completados_gripe.completados}
                    </Text>
                  </Center>
                </Stack>
              </HStack>

              <HStack alignItems="center">
                <Stack>
                  <Center>
                    <Heading size="lg" pt="5px" ml="-1">
                      {"Fiebre"}
                    </Heading>

                    <Text pt="5px" fontSize="2xl">
                      {data.completados_fiebre.completados}
                    </Text>
                  </Center>
                </Stack>
              </HStack>

              <HStack alignItems="center">
                <Stack>
                  <Center>
                    <Heading size="lg" pt="5px" ml="-1">
                      {"Covid"}
                    </Heading>
                    <Text pt="5px" fontSize="2xl">
                      {data.completados_covid.completados}
                    </Text>
                  </Center>
                </Stack>
              </HStack>
            </HStack>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
}

export default CompletadosTarjeta;
