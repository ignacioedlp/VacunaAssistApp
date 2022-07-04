import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

function ActualizarPersonal({ route, navigation }) {
  const { dni, vacunatorio, rol } = route.params;
  const [idVacunatorio, setIdVacunatorio] = useState(vacunatorio);
  const [personalRol, setPersonalRol] = useState(rol);
  const [rolAdmin, setRolAdmin] = useState(personalRol.includes("Admin"));
  const [rolVacunador, setRolVacunador] = useState(personalRol.includes("Vacunador"));
  const [cargado, setCargado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlerRolVacunador = (rol) => setRolVacunador(rol);
  const handlerRolAdmin = (rol) => setRolAdmin(rol);
  const handlerVacunatorio = (vacun) => setIdVacunatorio(vacun);
  const handlerRol = (rolpersonal) => setPersonalRol(rolpersonal);
  const userData = useSelector((state) => state.user);

  const actualizarVacunatorio = async () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      dni: dni,
      id_vacunatorio: parseInt(idVacunatorio),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/admin/cambiar_vacunatorio_personal",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setCargado(true);
    setIsLoading(false);
    // }
  };

  const actualizarRol = async () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      dni: dni,
      rolAdmin: rolAdmin,
      rolVacunador: rolVacunador
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/admin/cambiar_rol_personal",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    setCargado(true);
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Center>
            <Heading my="3" fontSize="2xl" color="emerald.700">
              Acualizar datos para la persona con dni {dni}
            </Heading>
          </Center>
          <Select
            my="2"
            size="md"
            minWidth="200"
            selectedValue={idVacunatorio.toString()}
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
            <Button colorScheme="green" onPress={() => actualizarVacunatorio()}>
              Actualizar vacunatorio
            </Button>
          )}
          <Heading my="3" fontSize="2xl" color="emerald.700">
            Seleccionar roles:
          </Heading>
          <Checkbox
            value={rolAdmin}
            accessibilityLabel="RolAdmin"
            onChange={handlerRolAdmin}
            _text={{ fontSize: 12 }}
            colorScheme="emerald"
            defaultIsChecked = {
              personalRol.includes("Admin")
            }
          >
            Administrador
          </Checkbox>
          <Checkbox
            value={rolVacunador}
            accessibilityLabel="RolVacunador"
            onChange={handlerRolVacunador}
            _text={{ fontSize: 12 }}
            colorScheme="emerald"
            defaultIsChecked = {
              personalRol.includes("Vacunador")
            }
          >
            Vacunador
          </Checkbox>
          {!isLoading && (
            <Button colorScheme="green" onPress={() => actualizarRol()}>
              Actualizar rol
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
                  onPress={() => navigation.navigate("/admin/verPersonal")}
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

export default ActualizarPersonal;
