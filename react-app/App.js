import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "./screens/Inicio";
import LoginScreen from "./screens/LoginScreen";
import Registro from "./screens/Registro";
import Bodega from "./screens/Bodega";
import Historial from "./screens/Historial";
import EstatusHistorial from "./screens/EstatusHistorial";
import HeaderApp from "./components/HeaderApp";
import Usuario from "./screens/Usuario";
import OrdenBodega from "./screens/OrdenBodega";
import { ClienteProvider } from "./contexts/ClienteContext";
import OrdenHistorial from "./screens/OrdenHistorial";
import RacksScreen from "./screens/RacksScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ClienteProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Registro"
            component={Registro}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Bodega"
            component={Bodega}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Historial"
            component={Historial}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="EstatusHistorial"
            component={EstatusHistorial}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="OrdenBodega"
            component={OrdenBodega}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="OrdenHistorial"
            component={OrdenHistorial}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Usuario"
            component={Usuario}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="RacksScreen"
            component={RacksScreen}
            options={({ navigation, route }) => ({
              header: () => <HeaderApp navigation={navigation} route={route} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ClienteProvider>
  );
};

const styles = StyleSheet.create({
  cabecera: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "black",
  },
});

export default App;
