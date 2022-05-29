import React, { useState } from "react";
import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Text,
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';


function LoginScreen({ navigation }) {
  const [dni, setDni] = useState("");
  const [code, setCode] = useState(0);
  const [pass, setPass] = useState("");

  const handlerChangeDni = (dni) => setDni(dni);
  const handlerChangeCode = (code) => setCode(code);
  const handlerChangePass = (pass) => setPass(pass);

  const handlerLogin = async () => {
    response = await fetch("https://vacunassistservices-production.up.railway.app/auth/log_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni: dni,
        code: code,
        password: pass,
      }),
    }).then((response) => response.json());
    if (response.code == 200) {
      /* con esta función guardamos y mantenemos el token
      del usuario*/
     
      _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            '@JWTUSER',
            response.message
          );
        
        } catch (error) {
          console.log(error);
          // Error saving data
        }
      };
      _storeData();
      navigation.navigate('Home')
    }else{
      alert(response.message)
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Text fontSize="md">Bienvenido de nuevo</Text>
          <Input
            onChangeText={handlerChangeDni}
            size="xs"
            value={dni}
            placeholder="Dni"
          />
          <Input
            onChangeText={handlerChangeCode}
            size="xs"
            value={code}
            placeholder="Codigo"
          />
          <Input
            onChangeText={handlerChangePass}
            size="xs"
            value={pass}
            placeholder="Contraseña"
          />
          <Button onPress={() => handlerLogin()}>Iniciar Sesion</Button>
          <Button onPress={() => navigation.navigate('Register')}>
            Registrarme
          </Button>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default LoginScreen;
