import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessLogin from "./src/pages/business_login/BusinessLogin";
import Home from "./src/pages/home/Home";
import StudentLogin from "./src/pages/student_login/StudentLogin";
import StudentRegister from "./src/pages/student_signup/StudentSignUp";
import BottomTab from "./src/components/bottomTab/BottomTab";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="StudentRegister" component={StudentRegister} />
        <Stack.Screen name="BusinessLogin" component={BusinessLogin} />

        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
