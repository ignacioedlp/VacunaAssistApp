import React, { useState, useEffect } from "react";
import {
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  HStack,
  Heading,
  FlatList,
  Spinner,
  Select,
  CheckIcon,
  Image,
} from "native-base";
import Campania from "../components/CampaniaTarjeta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import {
  desactivateCovid,
  desactivateGripe,
  desactivateFiebre,
  activateCovid,
  activateGripe,
  activateFiebre,
} from "../context/slices/campaniasSlice";

function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const campaniasData = useSelector((state) => state.campanias);
  const userData = useSelector((state) => state.user);
  const [uiRol, setUiRol] = useState(userData.rol);
  const handlerChangeUIRol = (uiRol) => setUiRol(uiRol);

  const handlerSolicitarFiebre = async () => {
    setIsLoading(true);
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

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/fiebre_amarrilla",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          alert(result.message);
          dispatch(desactivateFiebre());
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const handlerSolicitarGripe = async () => {
    setIsLoading(true);
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

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/gripe",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if ((result.code = 200)) {
          alert(result.message);
          dispatch(desactivateGripe());
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const handlerSolicitarCovid = async () => {
    setIsLoading(true);
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

    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/covid",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          alert(result.message);
          dispatch(desactivateCovid());
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const handlerCancelarGripe = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/cancelar_gripe",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    if ((res.code = 200)) {
      alert(res.message);
      dispatch(activateGripe());
    } else {
      alert(res.message);
    }
    setIsLoading(false);
  };

  const handlerCancelarCovid = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/cancelar_covid",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    if ((res.code = 200)) {
      alert(res.message);
      dispatch(activateCovid());
    } else {
      alert(res.message);
    }

    setIsLoading(false);
  };

  const handlerCancelarFiebre = async () => {
    var myHeaders = new Headers();
    const value = userData.token;
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://vacunassistservices-production.up.railway.app/turnos/cancelar_fiebre",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();
    if ((res.code = 200)) {
      alert(res.message);
      dispatch(activateFiebre());
    } else {
      alert(res.message);
    }

    setIsLoading(false);
  };

  const campanias = [
    {
      id: 1,
      nombre: "Gripe",
      actionSolicitar: handlerSolicitarGripe,
      actionCancelar: handlerCancelarGripe,
    },
    {
      id: 2,
      nombre: "Fiebre Amarilla",
      actionSolicitar: handlerSolicitarFiebre,
      actionCancelar: handlerCancelarFiebre,
    },
    {
      id: 3,
      nombre: "Covid-19",
      actionSolicitar: handlerSolicitarCovid,
      actionCancelar: handlerCancelarCovid,
    },
  ];

  const nav_ciudadano = [
    {
      id: 1,
      nombre: "Turnos pendientes",
      action: () => navigation.navigate("ciudadano/turnosPendientes"),
    },
    {
      nombre: "Mis vacunas",
      id: 2,
      action: () => navigation.navigate("ciudadano/historial"),
    },
    {
      nombre: "Mi perfil",
      id: 3,
      action: () => navigation.navigate("/ciudadano/miPerfil"),
    },
    {
      id: 4,
      nombre: "Cerrar sesion",
      action: () => navigation.navigate("/auth/logout"),
    },
  ];

  const nav_personal = [
    {
      id: 1,
      nombre: "Ver listado",
      action: () => navigation.navigate("/vacunador/listadoTurnos"),
    },
    {
      id: 2,
      nombre: "Cerrar sesion",
      action: () => navigation.navigate("/auth/logout"),
    },
  ];

  const nav_admin = [
    {
      id: 1,
      nombre: "Ver stocks",
      action: () => navigation.navigate("/admin/verStock"),
    },
    {
      nombre: "Registrar personal",
      id: 2,
      action: () => navigation.navigate("/admin/registrarPersonal"),
    },
    {
      nombre: "Informes",
      id: 3,
      action: () => navigation.navigate("/admin/informes"),
    },
    {
      nombre: "Ver personal",
      id: 4,
      action: () => navigation.navigate("/admin/verPersonal"),
    },
    {
      id: 5,
      nombre: "Cerrar sesion",
      action: () => navigation.navigate("/auth/logout"),
    },
  ];

  const typeofNav = (rol) => {
    var user = rol;

    if (user.includes("Ciudadano")) {
      return nav_ciudadano;
    } else {
      if (user.includes("Vacunador")) {
        return nav_personal;
      } else {
        return nav_admin;
      }
    }
  };

  const typeOfSelector = (rol) => {
    var user = rol;
    if (user.includes("Vacunador")) {
      return (
        <Center bg="white">
          <Select
            mx="5"
            size="xl"
            w="100%"
            selectedValue={uiRol}
            accessibilityLabel="UIRol"
            onValueChange={(itemValue) => handlerChangeUIRol(itemValue)}
            placeholder="Elegir rol"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Vacunador" value="Vacunador" />
            <Select.Item label="Ciudadano" value="Ciudadano" />
          </Select>
        </Center>
      );
    } else {
      return (
        <Center bg="white">
          <Select
            mx="5"
            size="xl"
            w="100%"
            selectedValue={uiRol}
            accessibilityLabel="UIRol"
            onValueChange={(itemValue) => handlerChangeUIRol(itemValue)}
            placeholder="Elegir rol"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Vacunador" value="Vacunador" />
            <Select.Item label="Administrador" value="Admin" />
            <Select.Item label="Ciudadano" value="Ciudadano" />
          </Select>
        </Center>
      );
    }
  };

  useEffect(() => {
    console.log();
  }, []);

  return (
    <NativeBaseProvider>
      {userData.rol != "Ciudadano" && typeOfSelector(userData.rol)}
      {uiRol != "Ciudadano" ? (
        <Center w="100%" bg="white">
          <Image
            margin={4}
            source={require("../../assets/icon.png")}
            width={100}
            height={100}
            alt="logo"
          />
          <FlatList
            w="80%"
            top={1}
            padding={"2px"}
            data={typeofNav(uiRol)}
            horizontal={false}
            renderItem={({ item }) => (
              <Button
                margin={1}
                _text={{ fontSize: 30 }}
                onPress={item.action}
                colorScheme={item.nombre == "Cerrar sesion" ? "red" : "green"}
              >
                {item.nombre}
              </Button>
            )}
            keyExtractor={(item) => item.id}
          />
        </Center>
      ) : (
        <Center bg="white">
          <FlatList
            top={1}
            padding={"2px"}
            data={typeofNav(uiRol)}
            horizontal={true}
            renderItem={({ item }) => (
              <Button
                margin={1}
                _text={{ fontSize: 16 }}
                w="90px"
                onPress={item.action}
                colorScheme={item.nombre == "Cerrar sesion" ? "red" : "green"}
              >
                {item.nombre}
              </Button>
            )}
            keyExtractor={(item) => item.id}
          />

          <Image
            margin={4}
            source={require("../../assets/icon.png")}
            width={100}
            height={100}
            alt="logo"
          />
        </Center>
      )}

      {uiRol == "Ciudadano" && (
        <Center bg="white">
          <Stack mt={3} space={4} w="100%" maxW="100%">
            <Center>
              <Heading pt="27px" size="md" ml="-1">
                Campañas
              </Heading>
            </Center>
            <Campania
              campania={campanias[0].nombre}
              action={
                !campaniasData.gripe
                  ? campanias[0].actionSolicitar
                  : campanias[0].actionCancelar
              }
              stateButton={campaniasData.gripe}
            />
            {!campaniasData.fiebreCompletado && (
              <Campania
                campania={campanias[1].nombre}
                action={
                  !campaniasData.fiebre
                    ? campanias[1].actionSolicitar
                    : campanias[1].actionCancelar
                }
                stateButton={campaniasData.fiebre}
              />
            )}
            <Campania
              campania={campanias[2].nombre}
              action={
                !campaniasData.covid
                  ? campanias[2].actionSolicitar
                  : campanias[2].actionCancelar
              }
              stateButton={campaniasData.covid}
            />
          </Stack>
          {isLoading && (
            <HStack space={2} justifyContent="center">
              <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
              <Heading color="emerald.500" fontSize="md">
                Cargando
              </Heading>
            </HStack>
          )}
        </Center>
      )}

      <Center flex={1} bg="white">
        <Heading fontSize="lg">Hecho por JATECH©</Heading>
        <Image
          margin={4}
          source={require("../../assets/jatech.png")}
          width={100}
          height={100}
          alt="logo"
        />
      </Center>
    </NativeBaseProvider>
  );
}

export default HomeScreen;
