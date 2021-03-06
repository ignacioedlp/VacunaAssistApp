import React, { useState } from "react";
import {
  Box,
  Input,
  Center,
  Stack,
  NativeBaseProvider,
  Button,
  Text,
  Heading,
  Select,
  CheckIcon,
  Checkbox,
} from "native-base";
import {Alert} from 'react-native';

function RegisterScreen({ navigation }) {
  const [dni, setDni] = useState("");
  const [sexo, setSex] = useState("");
  const [nro_tramite, setNro_tramite] = useState("");
  const [pass, setPass] = useState("");
  const [pass_confirmation, setPass_confirmation] = useState("");
  const [email, setEmail] = useState("");
  const [vacunatorio, setVacunatorio] = useState("");
  const [riesgo, setRiesgo] = useState(false);
  const handlerChangeDni = (dni) => setDni(dni);
  const handlerChangeSexo = (sexo) => setSex(sexo);
  const handlerChangeNro_Tramite = (nro_tramite) => setNro_tramite(nro_tramite);
  const handlerChangePass = (pass) => setPass(pass);
  const handlerChangePass_confirmation = (pass_confirmation) =>
    setPass_confirmation(pass_confirmation);
  const handlerChangeEmail = (email) => setEmail(email);
  const handlerChangeVacunatorio = (vacunatorio) => setVacunatorio(vacunatorio);
  const handlerChangeRiesgo = (riesgo) => setRiesgo(riesgo);
  const [isLoading, setIsLoading] = useState(false);

  const handlerRegister = async () => {
    setIsLoading(true);
    if (dni != "" && sexo != "" && nro_tramite != "" && pass != "" && pass_confirmation != "" && email != "" && vacunatorio != "") {
      const response = await fetch(
        "https://vacunassistservices-production.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dni: parseInt(dni),
            sexo: sexo,
            nro_tramite: nro_tramite,
            password: pass,
            password_confirmation: pass_confirmation,
            email: email,
            vacunatorio: parseInt(vacunatorio),
            riesgo: riesgo,
          }),
        }
      ).then((response) => response.json());
      if (response.code == 200) {
        navigation.navigate("Login");
      } else {
        Alert.alert("VacunAssist",response.message);
      }
    } else {
      Alert.alert("VacunAssist","Completar los campos");
    } 
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Stack mt={3} space={4} w="75%" maxW="300px">
          <Heading fontSize="md">Bienvenido a VacunAssist</Heading>
          <Input
            onChangeText={handlerChangeDni}
            size="md"
            value={dni}
            placeholder="Dni"
          />
          <Select
            size="md"
            minWidth="200"
            selectedValue={sexo}
            accessibilityLabel="Sex"
            onValueChange={(itemValue) => handlerChangeSexo(itemValue)}
            placeholder="Sexo"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Masculino" value="M" />
            <Select.Item label="Femenino" value="F" />
          </Select>
          <Input
            onChangeText={handlerChangeNro_Tramite}
            size="md"
            value={nro_tramite}
            placeholder="numero de tramite"
            type="password"
          />
          <Input
            onChangeText={handlerChangePass}
            size="md"
            value={pass}
            placeholder="Contrase??a"
            type="password"
          />
          <Input
            onChangeText={handlerChangePass_confirmation}
            size="md"
            value={pass_confirmation}
            placeholder="Confirmar contrase??a"
            type="password"
          />
          <Input
            onChangeText={handlerChangeEmail}
            size="md"
            value={email}
            placeholder="Email"
          />
          <Select
            size="md"
            minWidth="200"
            selectedValue={vacunatorio}
            accessibilityLabel="Vacunatorio"
            onValueChange={(itemValue) => handlerChangeVacunatorio(itemValue)}
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
          <Checkbox
            value={riesgo}
            accessibilityLabel="Riesgo"
            onChange={handlerChangeRiesgo}
            _text={{ fontSize: 12 }}
          >
            ??Tiene alguno de estos riesgos:(Paciente oncol??gico, Persona trasplantada, Diabetes,
            Enfermedad Renal Cr??nica, Enfermedades Cardiovasculares,
            Enfermedades Respiratorias Cr??nicas)?
          </Checkbox>
          <Button colorScheme="green" onPress={() => handlerRegister()}>
            Registrarme
          </Button>
        </Stack>
        {isLoading ?? (
          <HStack space={2} justifyContent="center">
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

export default RegisterScreen;
