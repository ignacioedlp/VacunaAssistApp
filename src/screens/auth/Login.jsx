import React, { useState } from "react";
import { Alert } from "react-native";
import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  HStack,
  Image,
  Heading,
  Spinner,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  initCampania,
  desactivateFiebreCompletado,
} from "../../context/slices/campaniasSlice";
import { setUser } from "../../context/slices/userSlice";

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

  const ObtenerHistorial = async () => {
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
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
      "https://vacunassistservices-production.up.railway.app/turnos/historial",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();

    for (const turno in res) {
      if (
        res[turno].campania == "Fiebre amarilla" &&
        res[turno].estado == "Completado"
      ) {
        dispatch(desactivateFiebreCompletado());
      }
    }
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
        /* con esta función guardamos y mantenemos el token
      del usuario*/

        const rol = jwt_decode(response.message).rol;
        const vacunatorio = jwt_decode(response.message).vacunatorio;
        const vacunatorio_personal = jwt_decode(
          response.message
        ).vacunatorio_personal;
        dispatch(
          setUser({
            token: response.message,
            rol: rol,
            vacunatorio: vacunatorio.toString(),
            vacunatorio_personal:
              vacunatorio_personal != null
                ? vacunatorio_personal.toString()
                : "",
          })
        );

        const storeData = async () => {
          try {
            await AsyncStorage.setItem("@JWTUSER", response.message);
          } catch (error) {
            Alert.alert(
              "VacunAssist",
              "Error del sistema reinicie la aplicación"
            );
            // Error saving data
          }
        };
        storeData();
        const objCampania = await ObtenerPendientes();
        dispatch(initCampania(objCampania));
        await ObtenerHistorial();
        navigation.navigate("/home");
      } else {
        Alert.alert("VacunAssist", response.message);
      }
    } else {
      Alert.alert("VacunAssist", "Complete los campos");
    }
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center py="15" bg="white" h="100%">
        <Image
          source={require("../../../assets/icon.png")}
          width={100}
          height={100}
          alt="logo"
        />
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Center>
            <Heading my="3" fontSize="2xl" color="emerald.700">
              Bienvenido de nuevo
            </Heading>
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
            placeholder="Contraseña"
            type="password"
          />
          {!isLoading && (
            <Button onPress={() => handlerLogin()} colorScheme="green">
              Iniciar Sesion
            </Button>
          )}
          <Button
            onPress={() => navigation.navigate("/auth/signUp")}
            colorScheme="emerald"
            variant="outline"
            borderColor="emerald.600"
          >
            Registrarme
          </Button>
        </Stack>
        {isLoading && (
          <HStack space={2} justifyContent="center" marginTop={5}>
            <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
            <Heading color="emerald.500" fontSize="md">
              Cargando
            </Heading>
          </HStack>
        )}
        <Stack flex={1}>
          <Center flex={1} bg="white">
            <Heading fontSize="lg">🚀 Hecho por JATECH©</Heading>
          </Center>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default LoginScreen;
