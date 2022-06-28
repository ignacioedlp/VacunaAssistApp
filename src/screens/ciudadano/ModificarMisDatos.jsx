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
  const [riesgo, setRiesgo] = useState(false);

  const handleChangeEmailNuevo = (email) => setEmailNuevo(email);

  const handleChangeRiesgo = (riesgo) => setRiesgo(riesgo);

  const handleChangePassword = (password) => setPassword(password);

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
    setRiesgo(res.riesgo);
    setIsLoading(false);
  };

  useEffect(() => {
    VerPerfil();
  }, []);

  const handlerCerrarSesion = () => {
    _storeData = async () => {
      try {
        await AsyncStorage.removeItem("@JWTUSER");

        navigation.navigate("/auth/login");
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    };
    _storeData();
  };

  const handlerActualizar = async () => {
    setIsLoading(true);
    let cerrar = false;
    let raw = {
      email: "",
      password: "",
      riesgo: riesgo,
    };
    if (emailNuevo == email) {
      raw.email = emailNuevo;
    } else {
      if (emailNuevo != "") {
        raw.email = emailNuevo;
        cerrar = true;
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
          "Si modifica la contraseña debe ser de 6 digitos"
        );
        setIsLoading(false);
        return;
      } else {
        raw.password = password;
      }
    }

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/user/modificar_perfil",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raw),
      }
    ).then((response) => response.json());
    if (response.code == 200) {
      /* con esta función guardamos y mantenemos el token
    del usuario*/
      Alert.alert("VacunAssist", "Datos actualizados");
    } else {
      Alert.alert("VacunAssist", response.message);
    }

    if (cerrar) {
      setIsLoading(false);
      handlerCerrarSesion();
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
              <Heading size="lg" ml="-1" p="10px">
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
                <Text>Riesgo</Text>
                <Checkbox
                  mb="5"
                  value={riesgo}
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
