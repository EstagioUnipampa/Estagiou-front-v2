import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/hooks/pages/home/Home";
import StudentLogin from "./src/hooks/pages/student_login/StudentLogin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
