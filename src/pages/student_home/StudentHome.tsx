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
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import AvailableCard from "./components/AvailableCard";

export default function StudentHome() {
  const fontsLoaded = useAppFonts();
  const data = [...new Array(5).keys()];
  const progress = useSharedValue<number>(0);

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

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderText}>
            <Text style={styles.welcome}>Bem-vindo</Text>
            <Text style={styles.name}>Henry Kanwil</Text>
          </View>

          <Image
            style={styles.userIcon}
            source={require("../../../assets/images/userIcon.png")}
          />
        </View>
        <View style={styles.searchInput}>
          <SearchInput
            placeholder="Pesquise vagas aqui"
            onChange={() => console.log("clicou")}
          />
        </View>
      </SafeAreaView>
      <Card
        number={29}
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
            title="Desenvolvedor Fullstack"
            location="São Paulo, SP"
            salary="R$ 3.000,00"
            source={require("../../../assets/images/companyLogo1.png")}
            onPress={() => console.log(index)}
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
        <AvailableCard
          businessName="Nome Empresa"
          title="Desenvolvimento de Sistemas"
          salary="R$740,00"
          location="São Paulo, Brasil"
          source={require("../../../assets/images/companyLogo2.png")}
        />
        <AvailableCard
          businessName="Nome Empresa"
          title="Desenvolvimento de Sistemas"
          salary="R$740,00"
          location="São Paulo, Brasil"
          source={require("../../../assets/images/companyLogo2.png")}
        />
        <AvailableCard
          businessName="Nome Empresa"
          title="Desenvolvimento de Sistemas"
          salary="R$740,00"
          location="São Paulo, Brasil"
          source={require("../../../assets/images/companyLogo2.png")}
        />
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
  searchInput: {
    display: "flex",
    alignItems: "center",
    paddingStart: 30,
    paddingEnd: 30,
    paddingBottom: 25,
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
