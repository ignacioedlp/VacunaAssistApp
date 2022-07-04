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
  Checkbox,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function RegistrarPersonal({ navigation }) {
  const [dni, setDni] = useState("");
  const [vacunatorio, setVacunatorio] = useState("");
  const [rolVacunador, setRolVacunador] = useState(false);
  const [rolAdmin, setRolAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerRolVacunador = (rol) => setRolVacunador(rol);
  const handlerRolAdmin = (rol) => setRolAdmin(rol);
  const handlerDni = (dni) => setDni(dni);
  const handlerEmail = (email) => setEmail(email);
  const handlerVacunatorio = (nro) => setVacunatorio(nro);

  const userData = useSelector((state) => state.user);

  const cargarDatos = async () => {
    if (dni != "" && rol != "" && vacunatorio != "" && email != "") {
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
        rolVacunador: rolVacunador,
        rolAdmin: rolAdmin,
        vacunatorio: parseInt(vacunatorio),
      });

     

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "https://vacunassistservices-production.up.railway.app/admin/registrar_personal",
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
              Registrar personal
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
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Seleccionar roles:
          </Heading>
          <Checkbox
            value={rolAdmin}
            accessibilityLabel="RolAdmin"
            onChange={handlerRolAdmin}
            _text={{ fontSize: 12 }}
            colorScheme="emerald"
          >
            Administrador
          </Checkbox>
          <Checkbox
            value={rolVacunador}
            accessibilityLabel="RolVacunador"
            onChange={handlerRolVacunador}
            _text={{ fontSize: 12 }}
            colorScheme="emerald"
          >
            Vacunador
          </Checkbox>
          <Select
            isDisabled = {!rolVacunador}
            size="md"
            minWidth="200"
            selectedValue={vacunatorio}
            accessibilityLabel="Vacunatorio"
            onValueChange={(itemValue) => handlerVacunatorio(itemValue)}
            placeholder="Vacunatorio"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Hospital 9 Julio" value="1" />
            <Select.Item label="Corralon municipal" value="2" />
            <Select.Item label="Polideportivo" value="3" />
          </Select>
          {!isLoading && (
            <Button
              colorScheme="green"
              onPress={() => cargarDatos()}
              isDisabled={cargado ? true : false}
            >
              Continuar
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

export default RegistrarPersonal;
