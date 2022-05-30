import { StyleSheet } from "react-native";
import { useState } from "react";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import HistorialVacunacionScreen from "./src/screens/HistorialVacunacion";
import TurnosPendientesScreen from "./src/screens/TurnosPendientes";
import LogoutScreen from "./src/screens/Logout";
import TurnosDelDiaScreen from "./src/screens/TurnosDelDia";
import CargarDatosScreen from "./src/screens/CargarDatos";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as React from "react";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isUser, setIsUser] = useState(isLoggedIn);

  const isLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("@JWTUSER");
      console.log(value);
      if (value != null) {
        console.log("dsas");
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const isVacunador = async () => {
    if (isLoggedIn) {
      const value = await AsyncStorage.getItem("@JWTUSER");
      var decoded = jwt_decode(value);
      console.log(decoded);
    }
  };


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerBackVisible: false,
          title: "VacunAssist",
        }}
        initialRouteName={isUser ? "Home" : "Login"}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Historial" options={{gestureEnabled:true}} component={HistorialVacunacionScreen} />
        <Stack.Screen
          name="Turnos pendientes"
          component={TurnosPendientesScreen}
          options={{gestureEnabled:true}}
        />
        <Stack.Screen name="Logout" component={LogoutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" options={{gestureEnabled:true}} component={RegisterScreen} />
        <Stack.Screen name="Listado de turnos" options={{gestureEnabled:true}} component={TurnosDelDiaScreen} />
        <Stack.Screen name="Cargar datos" options={{gestureEnabled:true}} component={CargarDatosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
