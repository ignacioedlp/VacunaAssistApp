import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
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
  VStack,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  desactivateCovid,
  desactivateGripe,
  desactivateFiebre,
} from "../context/slices/campaniasSlice";

function Perfil({ navigation }) {
  const stateFiebre = useSelector((state) => state.campanias.fiebre);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [campania, setCampania] = useState("");
  const [idCampania, setIdCampania] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [fiebreActive, setFiebreActive] = useState(true);

  const ObtenerHistorial = async () => {
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
      "https://vacunassistservices-production.up.railway.app/turnos/historial",
      requestOptions
    ).catch((error) => console.log("error", error));
    const res = await result.json();

    for (const turno in res) {
      if (res[turno].campania == "Fiebre amarilla") {
        setFiebreActive(false);
      }
    }

    console.log(res);
  };

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

    setUser(res);
    setIsLoading(false);
  };

  useEffect(() => {
    VerPerfil();
    ObtenerHistorial();
  }, []);

  const cargarVacunaPropia = async () => {
    console.log("Cargando datos");
    if (dateSelected != null && dateSelected != undefined) {
      var myHeaders = new Headers();
      const value = userData.token;
      const token = "Bearer " + value;
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        fecha: dateSelected,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "https://vacunassistservices-production.up.railway.app/user/ingresar_vacuna_" +
          campania,
        requestOptions
      ).catch((error) => console.log("error", error));
      const res = await result.json();
      if (res.code == 200) {
        Alert.alert("VacunAssist", res.message);
        if (campania.includes("fiebre")) {
          dispatch(desactivateFiebre());
          setFiebreActive(false);
          console.log("Desactivando fiebre");
        } else {
          if (campania.includes("gripe")) {
            dispatch(desactivateGripe());
          } else {
            if (campania.includes("covid")) {
              dispatch(desactivateCovid());
            }
          }
        }
      } else {
        Alert.alert("VacunAssist", "Se produjo un error");
      }
    } else {
      Alert.alert("VacunAssist", "Seleccione una fecha");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    //Si la fecha seleccionada que hoy no inicializa la fecha y lanza un mensaje
    const fecha = new Date(); //fecha de hoy
    // acomodar la fecha que seleccionada
    if (
      date.getTime() > fecha.getTime() ||
      (fecha.getDay() == date.getDay() && fecha.getMonth() == date.getMonth())
    ) {
      Alert.alert("Error", "Seleccione una fecha anterior a hoy");
      hideDatePicker();
    } else {
      setDateSelected(date);
      hideDatePicker();
    }
  };

  return (
    <NativeBaseProvider>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
                Mi perfil
              </Heading>
              <Avatar
                bg="green.500"
                size="xl"
                source={{
                  uri: user.avatar,
                }}
              >
                {user.nombre.charAt(0) + user.apellido.charAt(0)}
              </Avatar>
              <Heading size="lg" ml="-1" p="10px">
                {user.nombre + " " + user.apellido}
              </Heading>
              <HStack>
                <Heading size="lg" ml="-1" p="10px">
                  Dni:{" "}
                </Heading>
                <Heading size="lg" ml="-1" p="10px">
                  {user.dni}
                </Heading>
              </HStack>
              <HStack justifyContent="center">
                <Heading size="lg" ml="-1" p="10px">
                  Nacimiento:{" "}
                </Heading>
                <Heading size="lg" ml="-1" p="10px">
                  {user.fecha_nacimiento}
                </Heading>
              </HStack>

              <HStack>
                <Heading size="lg" ml="-1" p="10px">
                  Email:{" "}
                </Heading>
                <Heading size="lg" ml="-1" p="10px">
                  {user.email}
                </Heading>
              </HStack>

              <HStack>
                <Heading size="lg" ml="-1" p="10px">
                  Vacunatorio:{" "}
                </Heading>
                <Heading size="lg" ml="-1" p="10px">
                  {user.vacunatorio}
                </Heading>
              </HStack>

              <HStack>
                <Button
                  margin={1}
                  _text={{ fontSize: 12, textAlign: "center" }}
                  w="90px"
                  colorScheme={"green"}
                  onPress={() => {
                    setIdCampania(3);
                    setCampania("covid");
                    setModalVisible(!modalVisible);
                  }}
                >
                  Cargar vacuna covid
                </Button>

                {fiebreActive && (
                  <Button
                    margin={1}
                    _text={{ fontSize: 12, textAlign: "center" }}
                    w="90px"
                    onPress={() => {
                      setIdCampania(1);
                      setCampania("fiebre");
                      setModalVisible(!modalVisible);
                    }}
                    colorScheme={"green"}
                  >
                    Cargar vacuna fiebre
                  </Button>
                )}

                <Button
                  margin={1}
                  _text={{ fontSize: 12, textAlign: "center" }}
                  w="90px"
                  onPress={() => {
                    setIdCampania(2);
                    setCampania("gripe");
                    setModalVisible(!modalVisible);
                  }}
                  colorScheme={"green"}
                >
                  Cargar vacuna gripe
                </Button>
              </HStack>
            </Center>
          )}
        </Stack>
      </Center>
      <Center>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          bottom="4"
          animationConfig={{
            animationIn: "slideInUp",
            animationOut: "slideOutDown",
          }}
          justifyContent="flex-end"
          size="lg"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Cuando te vacunaste contra {campania}</Modal.Header>
            <Modal.Body>
              <Button colorScheme={"green"} onPress={showDatePicker}>
                Selecciona un dia
              </Button>
              {dateSelected && (
                <Heading mt={1}>
                  Fecha seleccionada:{" "}
                  {
                    /* {Muestro la fecha si selecciono una fecha} */
                    dateSelected.getUTCDate() +
                      " - " +
                      (dateSelected.getMonth() + 1) +
                      " - " +
                      dateSelected.getFullYear()
                  }
                </Heading>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                colorScheme={"green"}
                flex="1"
                isDisabled={dateSelected ? false : true}
                onPress={() => {
                  cargarVacunaPropia();
                  setModalVisible(false);
                }}
              >
                Cargar vacuna
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </NativeBaseProvider>
  );
}

export default Perfil;
