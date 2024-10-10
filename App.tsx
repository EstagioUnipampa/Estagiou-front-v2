import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/home/Home";
import StudentLogin from "./src/pages/student_login/StudentLogin";
import BusinessLogin from "./src/pages/business_login/BusinessLogin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
