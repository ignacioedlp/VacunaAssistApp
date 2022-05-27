import React, { useState } from "react";
import {
  Box,
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Text,
} from "native-base";

function Register() {
  const [dni, setDni] = useState("");
  const [sexo, setCode] = useState("");
  const [nro_tramite, setNro_tramite] = useState("");
  const [pass, setPass] = useState("");
  const [pass_confirmation, setPass_confirmation] = useState("");
  const [email, setEmail] = useState("");
  const [vacunatorio, setVacunatorio] = useState("");
  const [riesgo, setRiesgo] = useState("");
  const handlerChangeDni = (dni) => setDni(dni);
  const handlerChangeSexo = (sexo) => setSex(sexo);
  const handlerChangeNro_Tramite = (nro_tramite) => setNro_tramite(nro_tramite);
  const handlerChangePass = (pass) => setPass(pass);
  const handlerChangePass_confirmation = (pass_confirmation) =>
    set(pass_confirmation);
  const handlerChangeEmail = (email) => set(email);
  const handlerChangeVacunatorio = (vacunatorio) => set(vacunatorio);
  const handlerChangeRiesgo = (riesgo) => set(riesgo);

  const handlerRegister = () => {
    fetch("https://vacunassistservices-production.up.railway.app/auth/log_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni: dni,
        sexo: sexo,
        password: pass,
        //falta aca, seguir
      }),
    }).then((response) => response.json());
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
          <Button onPress={() => console.log("hello world")}>
            Registrarme
          </Button>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default Login;
