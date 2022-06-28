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
import { Pressable } from "react-native";

function Stock({ data, navigation }) {
  const actualizarDatos = (campania, vacunatorio) => {
    navigation.navigate("/admin/sumarStock", {
      id_campania: campania,
      id_vacunatorio: vacunatorio,
    });
  };
  return (
    <Box mx="45px" p="2">
      <Box
        maxW="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
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
              <Heading size="md" ml="-1">
                {data.vacunatorio.nombre}
              </Heading>
            </Center>
          </Stack>

          <Center>
            <HStack alignItems="space-between" space={4}>
              <Pressable
                onPress={() =>
                  actualizarDatos(2, data.vacunatorio.id_vacunatorio)
                }
              >
                <HStack alignItems="center">
                  <Stack>
                    <Center>
                      <Heading pt="15px" size="md" ml="-1">
                        {"Gripe"}
                      </Heading>
                      <Text pt="10px">{data.stock_gripe.stock}</Text>
                    </Center>
                  </Stack>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() =>
                  actualizarDatos(1, data.vacunatorio.id_vacunatorio)
                }
              >
                <HStack alignItems="center">
                  <Stack>
                    <Center>
                      <Heading pt="15px" size="md" ml="-1">
                        {"Fiebre"}
                      </Heading>

                      <Text pt="10px">{data.stock_fiebre.stock}</Text>
                    </Center>
                  </Stack>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() =>
                  actualizarDatos(3, data.vacunatorio.id_vacunatorio)
                }
              >
                <HStack alignItems="center">
                  <Stack>
                    <Center>
                      <Heading pt="15px" size="md" ml="-1">
                        {"Covid"}
                      </Heading>
                      <Text pt="10px">{data.stock_covid.stock}</Text>
                    </Center>
                  </Stack>
                </HStack>
              </Pressable>
            </HStack>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
}

export default Stock;
