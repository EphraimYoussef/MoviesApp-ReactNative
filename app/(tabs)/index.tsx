import SearchBar from "@/atoms/SearchBar";
import MoviesList from "@/components/MoviesList";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/TMDB_API";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter(); 

  const { data : movies,
    loading : moviesLoading,
    error : moviesError 
  } = useFetch(
    () => fetchMovies({query: ""})
  );
  





  return (
    <View className="flex-1 bg-primary">

      <Image source = {images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <SearchBar 
          placeholder="Search movies..."
          onPress={ () => { router.push("/search") } }
        />

        {
          moviesLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
          ) 
          : moviesError ? (
            <Text className="text-red-500 text-center mt-10">
              Error fetching movies: {moviesError?.message}
            </Text> 
          ) 
          : (
            <MoviesList movies={ movies.results } />
          )
        }
        
      </ScrollView>

    </View>

  );
}
