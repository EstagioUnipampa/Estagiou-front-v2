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
import BusinessHome from "./src/pages/business_home/BusinessHome";
import BusinessVacancySubscribes from "./src/pages/business_vacancy_subscribes/BusinessVacancySubscribes";
import BusinesVacancy from "./src/pages/business_vacancy/BusinessVacancy";
import BusinessDetailsJobVacancy from "./src/pages/business_details_job_vacancy/BusinessDetailsJobVacancy";
import StudentList from "./src/pages/student_list/StudentList";
import StudentProfile from "./src/pages/student_profile/StudentRegistrations";
import StudentProfileFromCompany from "./src/pages/student_profile_from_company/StudentProfileFromCompany";
import BusinessVacancyCreation from "./src/pages/business_vacancy_creation/BusinessVacancyCreation";

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
          name="BusinessDetailsJobVacancy"
          component={BusinessDetailsJobVacancy}
        />
        <Stack.Screen
          name="BusinessVacancyCreation"
          component={BusinessVacancyCreation}
        />
        <Stack.Screen name="StudentList" component={StudentList} />

        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="BottomTabBusiness" component={BottomTabBusiness} />
        <Stack.Screen name="StudentProfile" component={StudentProfile} />
        <Stack.Screen
          name="StudentProfileFromCompany"
          component={StudentProfileFromCompany}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
