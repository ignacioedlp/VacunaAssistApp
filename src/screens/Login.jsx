import React, { useState } from "react";

import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Text,
  Image,
  Heading,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ navigation }) {
  const [dni, setDni] = useState();
  const [code, setCode] = useState();
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlerChangeDni = (dni) => setDni(dni);
  const handlerChangeCode = (code) => setCode(code);
  const handlerChangePass = (pass) => setPass(pass);

  const handlerLogin = async () => {
    setIsLoading(true);
    if (code != "" && pass != "" && dni != "") {
      const response = await fetch(
        "https://vacunassistservices-production.up.railway.app/auth/log_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dni: dni,
            code: code,
            password: pass,
          }),
        }
      ).then((response) => response.json());
      if (response.code == 200) {
        /* con esta función guardamos y mantenemos el token
      del usuario*/

        const storeData = async () => {
          try {
            await AsyncStorage.setItem("@JWTUSER", response.message);
          } catch (error) {
            alert("Error del sistema reinicie la aplicación");
            // Error saving data
          }
        };
        storeData();
        navigation.navigate("Home");
      } else {
        alert(response.message);
      }
    } else {
      alert("Complete los campos");
    }
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center py="15">
        <Image
          source={require("../../assets/icon.png")}
          width={100}
          height={100}
          alt="logo"
        />
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Center>
            <Heading fontSize="lg">Bienvenido de nuevo</Heading>
          </Center>

          <Input
            onChangeText={handlerChangeDni}
            size="md"
            value={dni}
            placeholder="Dni"
            type="number"
          />
          <Input
            onChangeText={handlerChangeCode}
            size="md"
            value={code}
            placeholder="Codigo"
            type="number"
          />
          <Input
            onChangeText={handlerChangePass}
            size="md"
            value={pass}
            placeholder="Contraseña"
          />
          <Button onPress={() => handlerLogin()} colorScheme="green">
            Iniciar Sesion
          </Button>
          <Button
            onPress={() => navigation.navigate("Register")}
            colorScheme="green"
          >
            Registrarme
          </Button>
        </Stack>
        {isLoading ?? (
          <HStack space={2} justifyContent="center">
            <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
            <Heading color="emerald.500" fontSize="md">
              Cargando
            </Heading>
          </HStack>
        )}
      </Center>
    </NativeBaseProvider>
  );
}

export default LoginScreen;
