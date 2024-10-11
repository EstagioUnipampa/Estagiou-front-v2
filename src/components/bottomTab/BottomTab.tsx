import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHome from "../../pages/student_home/StudentHome";
import StudentDocuments from "../../pages/student_documents/StudentDocuments";
import { Image, Text } from "react-native";
import StudentRegistrations from "../../pages/student_registrations/StudentRegistrations";
import StudentProfile from "../../pages/student_profile/StudentRegistrations";
import { useAppFonts } from "../../hooks/useAppFonts";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,

        tabBarActiveBackgroundColor: "#23A331",
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#1A7924",
        tabBarStyle: {
          height: 65,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: 12,
          marginBottom: 3,
        },
      })}
    >
      <Tab.Screen
        name="Menu"
        component={StudentHome}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../../../assets/icon/home-active.png")
                    : require("../../../assets/icon/home.png")
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Documentos"
        component={StudentDocuments}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../../../assets/icon/document-active.png")
                    : require("../../../assets/icon/document.png")
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Inscrições"
        component={StudentRegistrations}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../../../assets/icon/registrations-active.png")
                    : require("../../../assets/icon/registrations.png")
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={StudentProfile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../../../assets/icon/profile-active.png")
                    : require("../../../assets/icon/profile.png")
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
