import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import Lista from "../screens/Lista";
import NovaFoto from "../screens/NovaFoto";
import Detalhes from "../screens/Detalhes";

import Main from "../screens/Main";
import ImageBrowser from "../screens/ImageBrowserScreen";

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
          name="NovaFoto"
          component={NovaFoto}
          options={{ title: "Salvar nova foto" }}
        />
        <Stack.Screen
          name="ImageBrowser"
          component={ImageBrowser}
          options={{ title: "Selected 0 files" }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Escolher fotos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
