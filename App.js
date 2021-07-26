import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
// Screen
import Home from "./src/screen/Home";
import AddTodo from "./src/screen/AddTodo";
import DetailTodo from "./src/screen/DetailTodo";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 3,
          },
          cardStyle: {
            backgroundColor: "white",
          },
        }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddTodo' component={AddTodo} />
        <Stack.Screen name='DetailTodo' component={DetailTodo} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

export default App;
