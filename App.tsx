import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessLogin from "./src/pages/business_login/BusinessLogin";
import Home from "./src/pages/home/Home";
import StudentLogin from "./src/pages/student_login/StudentLogin";
import StudentRegister from "./src/pages/student_signup/StudentSignUp";
import BottomTab from "./src/components/bottomTab/BottomTab";
import BottomTabBusiness from "./src/components/bottomTabBusiness/BottomTabBusiness";
import DetailsJobVacancy from "./src/pages/details_job_vacancy/DetailsJobVacancy";
import StudentHome from "./src/pages/student_home/StudentHome";
import BusinessVacancyCreation from "./src/pages/business_vacancy_creation/BusinessVacancyCreation";
import BusinessHome from "./src/pages/business_home/BusinessHome";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="StudentRegister" component={StudentRegister} />
        <Stack.Screen name="BusinessHome" component={BusinessHome} />
        <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
        <Stack.Screen name="DetailsJobVacancy" component={DetailsJobVacancy} />
        <Stack.Screen
          name="BusinessVacancyCreation"
          component={BusinessVacancyCreation}
        />

        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="BottomTabBusiness" component={BottomTabBusiness} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
