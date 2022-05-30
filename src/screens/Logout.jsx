 import React from "react";
import {
  Input,
  Center,
  NativeBaseProvider,
  Button,
  Text,
  HStack,
  Box
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LogoutScreen({ navigation }) {
  const handlerCerrarSesion = () => {
    _storeData = async () => {
      try {
        await AsyncStorage.removeItem("@JWTUSER");

        navigation.navigate("Login");
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    };
    _storeData();
  };

  return (
    <NativeBaseProvider>
      <Center top={4}>
        <Text>Quieres cerrar sesion?</Text>
        <HStack mt={3} space={4} w="100%" maxW="300px">
          <Box w="50%">
            <Center>
              <Button w="150px"colorScheme="red" onPress={() => handlerCerrarSesion()}>
                Si
              </Button>
            </Center>
          </Box>
          <Box w="50%">
            <Center>
              <Button w="150px" colorScheme="green" onPress={() => navigation.navigate("Home")}>
                No
              </Button>
            </Center>
          </Box>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default LogoutScreen;
