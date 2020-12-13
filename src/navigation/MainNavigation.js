import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";

import ListaFotos from "../screens/ListaFotos";
import ListaTrackers from "../screens/ListaTrackers";
import SalvarUnica from "../screens/SalvarUnica";
import DeetsFotos from "../screens/DeetsFotos";
import SalvarMultiplas from "../screens/SalvarMultiplas";
import Seletor from "../screens/Seletor";
import Tracker from "../screens/Tracker";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.header : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
          headerTitleStyle: { alignSelf: "center", marginRight: 50 },
        }}
      >
        <Stack.Screen
          name="Fotos"
          component={ListaFotos}
          options={{ title: "Lista de fotos" }}
        />
        <Stack.Screen
          name="Trackers"
          component={ListaTrackers}
          options={{ title: "Lista de trackers" }}
        />
        <Stack.Screen
          name="DeetsFotos"
          component={DeetsFotos}
          options={{ title: "Detalhes da foto" }}
        />
        <Stack.Screen
          name="SalvarUnica"
          component={SalvarUnica}
          options={{ title: "Salvar nova foto" }}
        />
        <Stack.Screen
          name="Seletor"
          component={Seletor}
          options={{ title: "Selecione as fotos desejadas" }}
        />
        <Stack.Screen
          name="SalvarMultiplas"
          component={SalvarMultiplas}
          options={{ title: "Salvar novas fotos" }}
        />
        <Stack.Screen
          name="Tracker"
          component={Tracker}
          options={{ title: "Trajeto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
