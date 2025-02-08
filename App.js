import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Formulario from "./screens/Validacoes.jsx";

const Stack = createStackNavigator();
console.log("App.js está sendo executado");

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Validacoes" component={Formulario} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
