import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/searchInput/SearchInput";
import { useAppFonts } from "../../hooks/useAppFonts";
import Card from "./components/Card";
import RecommendedCard from "./components/RecommendedCard";
import React, { useEffect, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import AvailableCard from "./components/AvailableCard";
import { StackNavigationProp } from "@react-navigation/stack";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

type RootStackParamList = {
  DetailsJobVacancy: {
    id: string;
    businessName: string;
    jobTitle: string;
    logo: any;
    salary: string;
    location: string;
    description: string;
  };
  StudentHome: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StudentHome"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function StudentHome({ navigation }: Readonly<Props>) {
  const fontsLoaded = useAppFonts();
  const progress = useSharedValue<number>(0);

  type JobVacancyList = {
    id: string;
    title: string;
    salary: string;
    modality: string;
    description: string;
    company: {
      name: string;
    };
  };

  const [data, setData] = useState<JobVacancyList[]>([]);
  const [dataList, setDataList] = useState<JobVacancyList[]>([]);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const isFocused = useIsFocused();

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const fetchCount = async () => {
    try {
      const secureToken = await SecureStore.getItemAsync("secure_token");

      const response = await fetch(
        `http://10.0.2.2:8080/v1/enrollment/student`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secureToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEnrollmentsCount(data.length);
      } else {
        console.log("Erro ao buscar dados do usuário");
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchCount();
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");

        const response = await fetch(
          `http://10.0.2.2:8080/v1/jobvacancy/list`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const firstFive = data.slice(0, 5);

          setData(firstFive);
          setDataList(data);
        } else {
          console.log("Erro ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobVacancies();
  }, []);

  const [userData, setUserData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const secureToken = await SecureStore.getItemAsync("secure_token");

        const response = await fetch(
          `http://10.0.2.2:8080/v1/student/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secureToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.name,
          });
        } else {
          console.log("Erro ao buscar dados do usuário");
        }
      } catch (error) {
        console.error("Erro: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderText}>
            <Text style={styles.welcome}>Bem-vindo</Text>
            <Text style={styles.name}>{userData.name}</Text>
          </View>

          <Image
            style={styles.userIcon}
            source={require("../../../assets/images/userIcon.png")}
          />
        </View>
      </SafeAreaView>
      <Card
        number={enrollmentsCount}
        text="Incrições"
        source={require("../../../assets/images/confirmed.png")}
      />

      <View style={styles.recommendedWorksHeader}>
        <Text style={styles.recommendedWorksHeaderTitle}>
          Vagas recomendadas
        </Text>
        <Pagination.Custom<{ index: any }>
          progress={progress}
          data={data.map((index) => ({ index }))}
          dotStyle={{
            width: 13,
            height: 6,
            backgroundColor: "#D6D6D6",
            borderRadius: 14,
          }}
          activeDotStyle={{
            width: 26,
            overflow: "hidden",
            backgroundColor: "#1A7924",
          }}
          containerStyle={{
            gap: 6,
          }}
          horizontal
          onPress={onPressPagination}
        />
      </View>

      <Carousel
        ref={ref}
        autoPlayInterval={2000}
        loop={true}
        onProgressChange={progress}
        pagingEnabled={true}
        snapEnabled={true}
        width={310}
        height={109}
        style={{ width: "100%" }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 1,
        }}
        data={data}
        renderItem={({ index }) => (
          <RecommendedCard
            onPress={() =>
              navigation.navigate("DetailsJobVacancy", {
                id: data[index].id,
                businessName: data[index].company.name,
                jobTitle: data[index].title,
                logo: require("../../../assets/images/companyLogo2.png"),
                salary: data[index].salary,
                location: data[index].modality,
                description: data[index].description,
              })
            }
            source={require("../../../assets/images/companyLogo1.png")}
            title={data[index].title}
            salary={`R$ ${data[index].salary}`}
            location={data[index].modality}
          />
        )}
      />

      <View style={styles.availableWorksHeader}>
        <Text style={styles.availableWorksHeaderTitle}>Vagas disponíveis</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.avallableWorksMore}>Mais</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.availableWorksContainer}>
        {dataList.map((item) => (
          <AvailableCard
            key={item.id}
            onPress={() =>
              navigation.navigate("DetailsJobVacancy", {
                id: item.id,
                businessName: item.company.name,
                jobTitle: item.title,
                logo: require("../../../assets/images/companyLogo2.png"),
                salary: item.salary,
                location: item.modality,
                description: item.description,
              })
            }
            businessName={item.company.name}
            title={item.title}
            salary={`R$ ${item.salary}`}
            location={item.modality}
            source={require("../../../assets/images/companyLogo2.png")}
          ></AvailableCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF6FF",
  },
  content: {
    backgroundColor: "#23A331",
  },
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 27,
    paddingStart: 30,
    paddingEnd: 30,
    paddingBottom: 31,
  },
  containerHeaderText: {},
  welcome: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "white",
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "white",
  },
  userIcon: {
    width: 46,
    height: 46,
    borderRadius: 28,
  },
  recommendedWorksHeader: {
    paddingStart: 30,
    paddingEnd: 30,
    paddingBottom: 22,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  recommendedWorksHeaderTitle: {
    color: "#3D3D3D",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  indexesRecommendedWorks: {
    display: "flex",
    flexDirection: "row",
    columnGap: 6,
  },
  availableWorksHeader: {
    marginTop: 45,
    marginBottom: 34,
    paddingStart: 30,
    paddingEnd: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  availableWorksHeaderTitle: {
    color: "#3D3D3D",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  avallableWorksMore: {
    color: "#1A7924",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  availableWorksContainer: {
    marginBottom: 30,
    rowGap: 20,
  },
});
