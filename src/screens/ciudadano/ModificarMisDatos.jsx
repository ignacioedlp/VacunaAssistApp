import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Center,
  Stack,
  NativeBaseProvider,
  Text,
  Heading,
  HStack,
  Spinner,
  Button,
  Avatar,
  Modal,
  Input,
  VStack,
  Checkbox,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Perfil({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailNuevo, setEmailNuevo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [riesgo, setRiesgo] = useState();

  const handleChangeEmailNuevo = (email) => setEmailNuevo(email);

  const handleChangeRiesgo = (riesgo) => setRiesgo(riesgo);

  const handleChangePassword = (password) => setPassword(password);

  const handleChangePasswordActual = (password) => setPasswordActual(password);

  const VerPerfil = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/user/ver_perfil",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();

    setEmail(res.email);
    setEmailNuevo(res.email);
    setPassword("");
    console.log(res.riesgo);
    setRiesgo(res.riesgo);
    setIsLoading(false);
  };

  useEffect(() => {
    VerPerfil();
  }, []);


  const handlerActualizar = async () => {
    setIsLoading(true);

    let raw = {
      email: "",
      password: "",
      passwordActual: "",
      riesgo: riesgo,
    };
    if (emailNuevo == email) {
      raw.email = emailNuevo;
    } else {
      if (emailNuevo != "") {
        raw.email = emailNuevo;
      } else {
        raw.email = email;
      }
    }
    if (password == "") {
      raw.password = password;
    } else {
      if (password.length != 6) {
        Alert.alert(
          "VacunAssist",
          "Si modifica la contraseña debe ser de 6 caracteres"
        );
        setIsLoading(false);
        return;
      } else {
        raw.passwordActual = passwordActual;
        raw.password = password;
      }
    }
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/user/modificar_perfil",
      requestOptions
    ).then((response) => response.json());
    if (response.code == 200) {
      /* con esta función guardamos y mantenemos el token
    del usuario*/
      Alert.alert("VacunAssist", "Datos actualizados");
    } else {
      Alert.alert("VacunAssist", response.message);
    }

    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          {isLoading ? (
            <HStack space={2} justifyContent="center" marginTop={5}>
              <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
              <Heading color="emerald.500" fontSize="md">
                Cargando datos
              </Heading>
            </HStack>
          ) : (
            <Center>
              <Heading my="3" fontSize="2xl" color="emerald.700">
                Modificar datos
              </Heading>
              <VStack>
                <Text>Email</Text>
                <Input
                  mb="5"
                  onChangeText={handleChangeEmailNuevo}
                  size="md"
                  value={emailNuevo}
                  placeholder="Email"
                />
                <Text>Contraseña</Text>
                <Input
                  mb="5"
                  onChangeText={handleChangePassword}
                  size="md"
                  type="password"
                  value={password}
                  placeholder="Contraseña"
                />
                <Text>Contraseña actual</Text>
                <Input
                  mb="5"
                  onChangeText={handleChangePasswordActual}
                  size="md"
                  type="password"
                  value={passwordActual}
                  placeholder="Contraseña actual"
                />
                <Text>Riesgo</Text>
                <Checkbox
                  mb="5"
                  colorScheme="emerald"
                  defaultIsChecked={riesgo}
                  accessibilityLabel="Riesgo"
                  onChange={handleChangeRiesgo}
                  _text={{ fontSize: 12 }}
                >
                  ¿Tiene alguno de estos riesgos:(Paciente oncológico, Persona
                  trasplantada, Diabetes, Enfermedad Renal Crónica, Enfermedades
                  Cardiovasculares, Enfermedades Respiratorias Crónicas)?
                </Checkbox>
              </VStack>
              <Button
                margin={1}
                _text={{ fontSize: 12, textAlign: "center" }}
                w="90px"
                colorScheme={"green"}
                onPress={() => handlerActualizar()}
              >
                Actualizar
              </Button>
            </Center>
          )}
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default Perfil;
