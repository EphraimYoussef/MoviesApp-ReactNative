import SearchBar from "@/atoms/SearchBar";
import MoviesList from "@/components/MoviesList";
import TrendingMovies from "@/components/TrendingMovies";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { getTrendingSearches } from "@/services/appWrite";
import { fetchMovies } from "@/services/TMDB_API";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter(); 

  const { 
    data : movies,
    loading: loadingMovies,
    error: errorMovies 
  } = useFetch(
    () => fetchMovies({query: ""})
  );
  

  const { 
    data : trendingMovies,
    loading: loadingTrendingMovies,
    error: errorTrendingMovies 
  } = useFetch(getTrendingSearches);




  return (
    <View className="flex-1 bg-primary">

      <Image source = {images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

      <ScrollView className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <SearchBar 
          placeholder="Search movies..."
          onPress={ () => { router.push("/Search") } }
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
              {
                trendingMovies && <TrendingMovies movies={ trendingMovies } />
              }
              {
                movies && <MoviesList movies={ movies?.results } />
              }
            </>
          )
        }

      </ScrollView>

    </View>

  );
}
