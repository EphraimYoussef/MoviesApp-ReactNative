import SearchBar from "@/atoms/SearchBar";
import MoviesList from "@/components/MoviesList";
import TrendingMovies from "@/components/TrendingMovies";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { getTrendingSearches } from "@/services/appWrite";
import { fetchMovies } from "@/services/TMDB_API";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, Text, View } from "react-native";
import * as Haptics from 'expo-haptics';
import { TopSpinner } from "@/atoms/TopSpinner";

export default function Index() {
  const router = useRouter(); 
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { 
    data : movies,
    loading: loadingMovies,
    error: errorMovies,
    refetch : refetchMovies
  } = useFetch(
    () => fetchMovies({query: ""})
  );
  
  const { 
    data : trendingMovies,
    loading: loadingTrendingMovies,
    error: errorTrendingMovies,
    refetch : refetchTrending
  } = useFetch(getTrendingSearches);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchMovies(),
      refetchTrending()
    ]);
    setRefreshing(false);
  }, [refetchMovies, refetchTrending]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const handleScrollEndDrag = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y < -100 && !refreshing) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onRefresh();
    }
  };

  return (
    <View className="flex-1 bg-primary">

      <Image source = {images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

      <TopSpinner scrollY={scrollY} />

      <Animated.ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <SearchBar 
          placeholder="Search movies..."
          onPress={() => { router.push("/Search") }}
          editable={false}
        />

        {
          loadingMovies || loadingTrendingMovies ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator
                size="large"
                color="#ab8bff"
              />
            </View>
          ) 
          : errorMovies || errorTrendingMovies ? (
            <Text className="text-red-500 text-center mt-10">
              Error fetching movies: {errorMovies?.message || errorTrendingMovies?.message}
            </Text> 
          ) 
          : (
            <>
              {trendingMovies && <TrendingMovies movies={trendingMovies} />}
              {movies && <MoviesList movies={movies?.results} />}
            </>
          )
        }
      </Animated.ScrollView>
    </View>

  );
}
