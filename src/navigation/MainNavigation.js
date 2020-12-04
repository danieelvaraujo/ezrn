import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";

import Lista from "../screens/Lista";
import SalvarUnica from "../screens/SalvarUnica";
import Detalhes from "../screens/Detalhes";
import SalvarMultiplas from "../screens/SalvarMultiplas";
import Seletor from "../screens/Seletor";

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
          headerTitleStyle: { alignSelf: "center" },
        }}
      >
        <Stack.Screen
          name="Listagem"
          component={Lista}
          options={{ title: "Lista de fotos" }}
        />
        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
