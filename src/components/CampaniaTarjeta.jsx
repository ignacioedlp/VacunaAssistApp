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
        <Stack p="4" space={5}>
          <Stack space={2}>
            <Center>
              <Heading size="md" ml="-1">
                {campania}
              </Heading>
            </Center>
          </Stack>
          <Center>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Button w="150px" colorScheme="green" size="md" onPress={action}>
                  Solicitar
                </Button>
              </HStack>
            </HStack>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
}

export default Campania;
