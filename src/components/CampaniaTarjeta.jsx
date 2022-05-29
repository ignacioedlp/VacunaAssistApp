import React from "react";

import {
  Center,
  Stack,
  AspectRatio,
  Image,
  Button,
  Heading,
  HStack,
  Box,
} from "native-base";

function Campania({ campania, action }) {
  return (
    <Box alignItems="center" p="4">
      <Box
        maxW="400px"
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
        <Stack p="4" space={5}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {campania}
            </Heading>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Button colorScheme="green" onPress={action}>
                Solicitar
              </Button>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Campania;
