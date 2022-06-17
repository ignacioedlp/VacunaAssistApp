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

function NoRegistrada({ navigation }) {
  const [campania, setCampania] = useState("");
  const [dni, setDni] = useState("");
  const [nro_lote, setNro_lote] = useState("");
  const [marca, setMarca] = useState("");
  const [email, setEmail] = useState("");

  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerCampania = (campania) => setCampania(campania);
  const handlerDni = (dni) => setDni(dni);
  const handlerEmail = (email) => setEmail(email);
  const handlerNro_lote = (nro) => setNro_lote(nro);
  const handlerMarca = (marca) => setMarca(marca);
  const userData = useSelector((state) => state.user);

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

  const cargarDatos = async () => {
    if (
      marca != "" &&
      nro_lote != "" &&
      dni != "" &&
      campania != "" &&
      email != ""
    ) {
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
        campania: parseInt(campania),
        lote: nro_lote,
        marca: marca,
        vacunatorio: parseInt(decoded.vacunatorio),
      });

      console.log(raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(rutaCampania(campania), requestOptions).catch(
        (error) => console.log("error", error)
      );
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
            <Heading size="lg" ml="-1" p="10px">
              Registrar vacuna a persona no registrada
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
          <Select
            minWidth="200"
            selectedValue={campania}
            accessibilityLabel="Campaña"
            onValueChange={(itemValue) => handlerCampania(itemValue)}
            placeholder="Campaña"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Fiebre amarilla" value="1" />
            <Select.Item label="Gripe" value="2" />
            <Select.Item label="Covid-19" value="3" />
          </Select>
          <Input
            onChangeText={handlerNro_lote}
            size="md"
            value={nro_lote}
            placeholder="Numero del lote"
          />
          <Input
            onChangeText={handlerMarca}
            size="md"
            value={marca}
            placeholder="Marca de la vacuna"
          />
          <Button
            colorScheme="green"
            onPress={() => cargarDatos()}
            isDisabled={cargado ? true : false}
          >
            Cargar datos
          </Button>
          {isLoading ?? (
            <HStack space={2} justifyContent="center">
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
                  onPress={() => navigation.navigate("Home")}
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