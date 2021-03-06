import React, { useState } from "react";
import {Alert} from 'react-native';
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
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { initCampania } from "../context/slices/campaniasSlice";
import { setUser } from "../context/slices/userSlice";

function LoginScreen({ navigation }) {
  const [dni, setDni] = useState();
  const [code, setCode] = useState();
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handlerChangeDni = (dni) => setDni(dni);
  const handlerChangeCode = (code) => setCode(code);
  const handlerChangePass = (pass) => setPass(pass);

  const ObtenerPendientes = async () => {
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
    if (value == "null") {
      return {
        gripe: false,
        fiebre: false,
        covid: false,
      };
    }
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
      "https://vacunassistservices-production.up.railway.app/turnos/pendientes",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    initialState = {
      gripe: false,
      fiebre: false,
      covid: false,
    };
    for (const turno in res) {
      switch (res[turno].campania) {
        case "Fiebre amarilla":
          initialState.fiebre = true;
          break;
        case "Gripe":
          initialState.gripe = true;
          break;
        case "Covid-19":
          initialState.covid = true;
          break;
      }
    }
    return initialState;
  };

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
        /* con esta funci??n guardamos y mantenemos el token
      del usuario*/

        const token = jwt_decode(response.message).rol;
        dispatch(
          setUser({
            token: response.message,
            rol: token,
          })
        );

        const storeData = async () => {
          try {
            await AsyncStorage.setItem("@JWTUSER", response.message);
          } catch (error) {
            Alert.alert("VacunAssist","Error del sistema reinicie la aplicaci??n");
            // Error saving data
          }
        };
        storeData();
        const objCampania = await ObtenerPendientes();
        dispatch(initCampania(objCampania));
        navigation.navigate("Home");
      } else {
        Alert.alert("VacunAssist",response.message);
      }
    } else {
      Alert.alert("VacunAssist","Complete los campos");
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
            type="password"
          />
          <Input
            onChangeText={handlerChangePass}
            size="md"
            value={pass}
            placeholder="Contrase??a"
            type="password"
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
