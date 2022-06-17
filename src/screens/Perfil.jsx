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

function Perfil({ navigation }) {
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [campania, setCampania] = useState("");
  const [idCampania, setIdCampania] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState();

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
  }, []);

  const cargarVacunaPropia = async () => {
    console.log("Cargando datos");
    if (date != null && date != undefined) {
      var myHeaders = new Headers();
      const value = userData.token;
      const token = "Bearer " + value;
      myHeaders.append("Authorization", token);

      var raw = JSON.stringify({
        fecha: date.toISOString(),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "https://vacunassistservices-production.up.railway.app/user/ingresar_vacuna_covid",
        requestOptions
      ).catch((error) => console.log("error", error));
      const res = await result.json();
      if (res.code == 200) {
        Alert.alert("VacunAssist", res.code);
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
    //Quiero ver la fecha con un dia menos
    const fecha = new Date(date);
    const fecha2 = new Date(fecha.setDate(fecha.getDate() - 1));
    setDate(fecha2);
    console.log(fecha2);
    hideDatePicker();
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
            <HStack space={2} justifyContent="center">
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
                    setCampania("covid-19");
                    setModalVisible(!modalVisible);
                  }}
                >
                  Cargar vacuna covid
                </Button>

                <Button
                  margin={1}
                  _text={{ fontSize: 12, textAlign: "center" }}
                  w="90px"
                  onPress={() => {
                    setIdCampania(1);
                    setCampania("fiebre amarilla");
                    setModalVisible(!modalVisible);
                  }}
                  colorScheme={"green"}
                >
                  Cargar vacuna fiebre
                </Button>

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
            </Modal.Body>
            <Modal.Footer>
              <Button
                colorScheme={"green"}
                flex="1"
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
