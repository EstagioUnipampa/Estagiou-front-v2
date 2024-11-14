import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { useAppFonts } from "../../hooks/useAppFonts";
import StudentDocuments from "../../pages/student_documents/StudentDocuments";
import StudentHome from "../../pages/student_home/StudentHome";
import StudentProfile from "../../pages/student_profile/StudentProfile";
import StudentRegistrations from "../../pages/student_subscribes/StudentSubscribes";
import LoadingIcon from "../loadingIcon/LoadingIcon";
// import InternshipDetails from "../../pages/intership_details/IntershipDetails";

const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  imageNonActive: ImageSourcePropType;
  imageActive: ImageSourcePropType;
}

const TabIcon = ({ focused, imageNonActive, imageActive }: TabIconProps) => (
  <Image source={focused ? imageActive : imageNonActive} />
);

const MenuTabIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    imageNonActive={require("../../../assets/icon/home.png")}
    imageActive={require("../../../assets/icon/home-active.png")}
  />
);

// const DocumentosTabIcon = ({ focused }: { focused: boolean }) => (
//   <TabIcon
//     focused={focused}
//     imageNonActive={require("../../../assets/icon/document.png")}
//     imageActive={require("../../../assets/icon/document-active.png")}
//   />
// );

const InscricoesTabIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    imageNonActive={require("../../../assets/icon/registrations.png")}
    imageActive={require("../../../assets/icon/registrations-active.png")}
  />
);

const PerfilTabIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon
    focused={focused}
    imageNonActive={require("../../../assets/icon/profile.png")}
    imageActive={require("../../../assets/icon/profile-active.png")}
  />
);

export default function BottomTab() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
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
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "timing",
            config: {
              duration: 100,
            },
          },
          hide: {
            animation: "timing",
            config: {
              duration: 100,
            },
          },
        },
      }}
    >
      <Tab.Screen
        name="Menu"
        component={StudentHome}
        options={{
          tabBarIcon: MenuTabIcon,
        }}
      />
      {/* <Tab.Screen
        name="Documentos"
        component={StudentDocuments}
        options={{
          tabBarIcon: DocumentosTabIcon,
        }}
      /> */}
      <Tab.Screen
        name="Inscrições"
        component={StudentRegistrations}
        options={{
          tabBarIcon: InscricoesTabIcon,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={StudentProfile}
        options={{
          tabBarIcon: PerfilTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}
