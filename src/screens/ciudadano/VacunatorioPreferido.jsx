import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Center,
  NativeBaseProvider,
  FlatList,
  Heading,
  Button,
  HStack,
  Spinner,
  Select,
  CheckIcon,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { setVacunatorio } from "../../context/slices/userSlice";

function VacunatorioPreferido() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const idvacunatorio = userData.vacunatorio;
  const [vacunatorioPreferido, setVacunatorioPreferido] =
    useState(idvacunatorio);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const handleChangeVacunatorio = (vacunatorio) => {
    setVacunatorioPreferido(vacunatorio);
  };

  const modificarVacunatorio = async () => {
    if (idvacunatorio == vacunatorioPreferido) {
      Alert.alert("Vacunatorio", "Seleccione un vacunatorio diferente");
      setIsLoading(false);
      return;
    }
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("@JWTUSER");
    const token = "Bearer " + value;
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id_vacunatorio: parseInt(vacunatorioPreferido),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "https://vacunassistservices-production.up.railway.app/user/cambiar_vacunatorio",
      requestOptions
    ).then((response) => response.json());
    if (response.code == 200) {
      /* con esta función guardamos y mantenemos el token
    del usuario*/
      let vacunatorio = vacunatorioPreferido.toString();
      dispatch(setVacunatorio({ vacunatorio: vacunatorio }));
      Alert.alert("VacunAssist", "Datos actualizados");
    } else {
      Alert.alert("VacunAssist", response.message);
    }
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Heading my="2">Vacunatorio preferido</Heading>
        <Select
          my="2"
          size="md"
          minWidth="200"
          selectedValue={vacunatorioPreferido}
          accessibilityLabel="Vacunatorio"
          onValueChange={(itemValue) => handleChangeVacunatorio(itemValue)}
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
          <Button colorScheme="green" onPress={() => modificarVacunatorio()}>
            Modificar vacunatorio
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
      </Center>
    </NativeBaseProvider>
  );
}

export default VacunatorioPreferido;
