import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Center,
  Spinner,
  Stack,
  Heading,
  Text,
  HStack,
  FlatList,
  Pressable,
  Input,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import PersonalTarjeta from "../../components/PersonalTarjeta";

function VerPersonal({ navigation }) {
  const [personal, setPersonal] = useState([
    {
      nombre: "Juan",
      apellido: "Perez",
      rol: "Admin",
      dni: "43738921",
      vacunatorio: "1",
    },
  ]);
  const [dniBuscado, setDniBuscado] = useState();
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const ObtenerPersonal = () => {
    // var myHeaders = new Headers();
    // const value = userData.token;
    // const token = "Bearer " + value;
    // myHeaders.append("Authorization", token);
    // var raw = "";
    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };
    // const result = await fetch(
    //   "https://vacunassistservices-production.up.railway.app/admin/ver_stock",
    //   requestOptions
    // ).catch((error) => console.log("error", error));
    // const res = await result.json();
    // setPersonal([
    //   {
    //     nombre: "jaun",
    //     rol: "Admin",
    //     dni: "43738921",
    //   },
    // ]);
    // setIsLoading(false);
  };

  // useEffect(() => {
  //   ObtenerPersonal();
  // });

  return (
    <NativeBaseProvider>
      {isLoading != true ? (
        <Center>
          <Heading size="lg" ml="-1" p="10px">
            Lista de personal
          </Heading>
          <Input
            w="75%"
            maxW="300px"
            mb={5}
            size={"lg"}
            placeholder="Buscar por dni"
            value={dniBuscado}
            onChangeText={(dni) => setDniBuscado(dni)}
          />
          {personal.length > 0 ? (
            <FlatList
              data={personal}
              renderItem={({ item }) =>
                dniBuscado == null ? (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("/admin/actualizarPersonal", {
                        vacunatorio: item.vacunatorio,
                        rol: item.rol,
                        dni: item.dni,
                      })
                    }
                  >
                    <PersonalTarjeta
                      nombre={item.nombre}
                      apellido={item.apellido}
                      rol={item.rol}
                      vacunatorio={item.vacunatorio}
                      dni={item.dni}
                    />
                  </Pressable>
                ) : (
                  item.dni.toString().includes(dniBuscado.toString()) && (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("/admin/actualizarPersonal", {
                          vacunatorio: item.vacunatorio,
                          rol: item.rol,
                          dni: item.dni,
                        })
                      }
                    >
                      <PersonalTarjeta
                        nombre={item.nombre}
                        apellido={item.apellido}
                        rol={item.rol}
                        vacunatorio={item.vacunatorio}
                        dni={item.dni}
                      />
                    </Pressable>
                  )
                )
              }
            />
          ) : (
            <Center>
              <Text>No posee vacunas aplicadas</Text>
            </Center>
          )}
        </Center>
      ) : (
        <HStack space={2} justifyContent="center" marginTop={5}>
          <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
          <Heading color="emerald.500" fontSize="md">
            Cargando datos
          </Heading>
        </HStack>
      )}
    </NativeBaseProvider>
  );
}

export default VerPersonal;