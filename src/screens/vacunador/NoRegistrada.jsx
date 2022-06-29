import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Heading,
  HStack,
  Spinner,
  Box,
  Select,
  CheckIcon,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function NoRegistrada({ route, navigation }) {
  const { id_campania } = route.params;
  const userData = useSelector((state) => state.user);
  const idvacunatorio = parseInt(userData.vacunatorio);

  const [dni, setDni] = useState("");
  const [nro_lote, setNro_lote] = useState("");
  const [marca, setMarca] = useState("");
  const [email, setEmail] = useState("");
  const [verificado, setVerificado] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlerDni = (dni) => setDni(dni);
  const handlerEmail = (email) => setEmail(email);
  const handlerNro_lote = (nro) => setNro_lote(nro);
  const handlerMarca = (marca) => setMarca(marca);

  const rutaCampania = (id) => {
    switch (id) {
      case "1":
        return "https://vacunassistservices-production.up.railway.app/vacunador/vacuna_fiebre_no_registrado";
      case "2":
        return "https://vacunassistservices-production.up.railway.app/vacunador/vacuna_gripe_no_registrado";
      case "3":
        return "https://vacunassistservices-production.up.railway.app/vacunador/vacuna_covid_no_registrado";
    }
  };

  const verificarDatos = async () => {
    if (dni != "" && email != "") {
      setIsLoading(true);
      var myHeaders = new Headers();
      const value = userData.token;
      const token = "Bearer " + value;
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      var decoded = jwt_decode(value);

      var dniAux = parseInt(dni);
      var idAux = parseInt(id_campania);

      var raw = JSON.stringify({
        dni: dniAux,
        campania: idAux,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "https://vacunassistservices-production.up.railway.app/vacunador/verificar_persona",
        requestOptions
      ).catch((error) => console.log("error", error));
      const res = await result.json();

      if (res.code == 200) {
        /* con esta función guardamos y mantenemos el token
      del usuario*/
        setVerificado(true);
      } else {
        Alert.alert("VacunAssist", res.message);
      }

      setIsLoading(false);
    } else {
      alert("Faltan rellenar campos");
    }
  };

  const cargarDatos = async () => {
    if (marca != "" && nro_lote != "" && dni != "" && email != "") {
      setIsLoading(true);
      var myHeaders = new Headers();
      const value = userData.token;
      const token = "Bearer " + value;
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      var decoded = jwt_decode(value);

      var raw = JSON.stringify({
        dni: dni,
        email: email,
        campania: id_campania.toString(),
        lote: nro_lote,
        marca: marca,
        vacunatorio: idvacunatorio,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        rutaCampania(id_campania),
        requestOptions
      ).catch((error) => console.log("error", error));
      const res = await result.json();
      if (res.code == 200) {
        /* con esta función guardamos y mantenemos el token
      del usuario*/
        Alert.alert("VacunAssist", "Carga y registro exitoso");
        setCargado(true);
      } else {
        Alert.alert("VacunAssist", res.message);
      }

      setIsLoading(false);
    } else {
      alert("Faltan rellenar campos");
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Center>
            <Heading my="3" fontSize="2xl" color="emerald.700">
              Registrar vacuna de{" "}
              {id_campania == 1
                ? "fiebre amarilla"
                : id_campania == 2
                ? "gripe"
                : "covid"}{" "}
              a persona no registrada
            </Heading>
          </Center>
          <Input
            onChangeText={handlerDni}
            size="md"
            value={dni}
            placeholder="Dni"
          />
          <Input
            onChangeText={handlerEmail}
            size="md"
            value={email}
            placeholder="Email"
          />
          <Button
            colorScheme="green"
            onPress={() => verificarDatos()}
            isDisabled={verificado ? true : false}
          >
            Verificar datos
          </Button>
          <Input
            onChangeText={handlerNro_lote}
            size="md"
            value={nro_lote}
            isDisabled={!verificado ? true : false}
            placeholder="Numero del lote"
          />
          <Input
            onChangeText={handlerMarca}
            size="md"
            value={marca}
            isDisabled={!verificado ? true : false}
            placeholder="Marca de la vacuna"
          />
          {!isLoading && (
            <Button
              colorScheme="green"
              onPress={() => cargarDatos()}
              isDisabled={!verificado ? true : false}
            >
              Cargar datos
            </Button>
          )}
          {isLoading && (
            <HStack space={2} justifyContent="center" marginTop={5}>
              <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
              <Heading color="emerald.500" fontSize="md">
                Cargando datos
              </Heading>
            </HStack>
          )}
          {cargado && (
            <Center>
              <Box>
                <Heading size="lg" ml="-1" p="10px">
                  Datos cargados
                </Heading>

                <Button
                  colorScheme="green"
                  onPress={() => navigation.navigate("/home")}
                >
                  Volver
                </Button>
              </Box>
            </Center>
          )}
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}

export default NoRegistrada;
