import { StyleSheet } from "react-native";
import { useState } from "react";
import LoginScreen from "./src/screens/auth/Login";
import RegisterScreen from "./src/screens/auth/Register";
import HomeScreen from "./src/screens/Home";
import HistorialVacunacionScreen from "./src/screens/ciudadano/HistorialVacunacion";
import TurnosPendientesScreen from "./src/screens/ciudadano/TurnosPendientes";
import LogoutScreen from "./src/screens/auth/Logout";
import TurnosDelDiaScreen from "./src/screens/vacunador/TurnosDelDia";
import CargarDatosScreen from "./src/screens/vacunador/CargarDatos";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as React from "react";
import { store } from "./src/context/store";
import { Provider } from "react-redux";
import VerStockScreen from "./src/screens/admin/VerStock";
import SumarStockScreen from "./src/screens/admin/SumarStock";
import NoRegistrada from "./src/screens/vacunador/NoRegistrada";
import Perfil from "./src/screens/ciudadano/Perfil";
import RegistrarPersonal from "./src/screens/admin/RegistrarPersonal";
import Informes from "./src/screens/admin/Informes";
import TurnosCancelados from "./src/screens/admin/Informes/TurnosCancelados";
import TurnosPendientes from "./src/screens/admin/Informes/TurnosPendientes";
import VacunasDadas from "./src/screens/admin/Informes/VacunasDadas";
import VacunasSobrantes from "./src/screens/admin/Informes/VacunasSobrantes";
import HistorialTurnos from "./src/screens/admin/Informes/HistorialTurnos";
import VerPersonal from "./src/screens/admin/VerPersonal";
import ActualizarPersonal from "./src/screens/admin/ActualizarPersonal";
import VacunatorioPreferido from "./src/screens/ciudadano/VacunatorioPreferido";
import ModificarMisDatos from "./src/screens/ciudadano/ModificarMisDatos";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isUser, setIsUser] = useState(isLoggedIn);

  const isLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("@JWTUSER");
      console.log(value);
      if (value != null) {
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerBackVisible: false,
            title: "VacunAssist",
          }}
          initialRouteName={isUser ? "/home" : "/auth/login"}
        >
          <Stack.Screen name="/home" component={HomeScreen} />
          <Stack.Screen
            name="ciudadano/historial"
            options={{ gestureEnabled: true }}
            component={HistorialVacunacionScreen}
          />
          <Stack.Screen
            name="ciudadano/turnosPendientes"
            component={TurnosPendientesScreen}
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen name="/auth/logout" component={LogoutScreen} />
          <Stack.Screen name="/auth/login" component={LoginScreen} />
          <Stack.Screen
            name="/auth/signUp"
            options={{ gestureEnabled: true }}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="/vacunador/listadoTurnos"
            options={{ gestureEnabled: true }}
            component={TurnosDelDiaScreen}
          />
          <Stack.Screen
            name="/vacunador/cargarDatos"
            options={{ gestureEnabled: true }}
            component={CargarDatosScreen}
          />
          <Stack.Screen
            name="/admin/verStock"
            options={{ gestureEnabled: true }}
            component={VerStockScreen}
          />
          <Stack.Screen
            name="/admin/sumarStock"
            options={{ gestureEnabled: true }}
            component={SumarStockScreen}
          />
          <Stack.Screen
            name="/vacunador/noRegistrada"
            options={{ gestureEnabled: true }}
            component={NoRegistrada}
          />
          <Stack.Screen
            name="/ciudadano/miPerfil"
            options={{ gestureEnabled: true }}
            component={Perfil}
          />
          <Stack.Screen
            name="/admin/registrarPersonal"
            options={{ gestureEnabled: true }}
            component={RegistrarPersonal}
          />
          <Stack.Screen
            name="/admin/informes"
            options={{ gestureEnabled: true }}
            component={Informes}
          />
          <Stack.Screen
            name="/admin/turnosCancelados"
            options={{ gestureEnabled: true }}
            component={TurnosCancelados}
          />
          <Stack.Screen
            name="/admin/turnosPendientes"
            options={{ gestureEnabled: true }}
            component={TurnosPendientes}
          />
          <Stack.Screen
            name="/admin/vacunasDadas"
            options={{ gestureEnabled: true }}
            component={VacunasDadas}
          />
          <Stack.Screen
            name="/admin/vacunasSobrantes"
            options={{ gestureEnabled: true }}
            component={VacunasSobrantes}
          />
          <Stack.Screen
            name="/admin/historial"
            options={{ gestureEnabled: true }}
            component={HistorialTurnos}
          />
          <Stack.Screen
            name="/admin/verPersonal"
            options={{ gestureEnabled: true }}
            component={VerPersonal}
          />
          <Stack.Screen
            name="/ciudadano/modificarDatos"
            options={{ gestureEnabled: true }}
            component={ModificarMisDatos}
          />
          <Stack.Screen
            name="/ciudadano/modificarVacunatorio"
            options={{ gestureEnabled: true }}
            component={VacunatorioPreferido}
          />
          <Stack.Screen
            name="/admin/actualizarPersonal"
            options={{ gestureEnabled: true }}
            component={ActualizarPersonal}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
