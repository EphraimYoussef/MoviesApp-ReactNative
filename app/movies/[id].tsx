import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/TMDB_API";
import { TMDB_CONFIG } from "@/config/TMDB_Config";
import { LinearGradient } from "expo-linear-gradient";
import { AlarmClock, CalendarDays } from "lucide-react-native";
import { icons } from "@/constants/icons";
import SaveButton from "@/atoms/SaveButton";


const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading, error } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading){
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator
          size="large"
          color="#ab8bff"
          className="mt-[100px]"
        />
      </View>
    );
  }

  if (error){
    return (
        <View className="flex-1 items-center justify-center bg-primary px-5">
          <Text className="text-white text-center">
            Oops! Something went wrong while fetching the movie details. Please
            try again later.
          </Text>
        </View>
      )
  }

  if (!movie){
    return null;
  }

  const imageBase = TMDB_CONFIG.IMAGE_BASE_URL;

  return (
    <ScrollView
      className="flex-1 bg-[#030014]"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >

      <View className="relative h-[380px]">
        <Image
          source={{ uri: `${imageBase}${movie.backdrop_path || movie.poster_path}` }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["#030014", "transparent"]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, zIndex: 2 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <LinearGradient
          colors={["transparent", "#030014"]}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, zIndex: 2 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <View className="absolute bottom-5 left-0 right-5 z-10 px-5 flex-row items-center">
          <View className="flex-1 mr-4">
            <Text className="text-white text-[28px] font-bold">
              {movie.title}
            </Text>
            {movie.tagline && (
              <Text className="text-[#bdbdbd] italic mt-1 mr-3">
                {movie.tagline}
              </Text>
            )}
          </View>
          <SaveButton movie = {movie} />
        </View>

      </View>

      <View className="flex-row justify-around items-center py-4 border-b border-[#333]">
        {
          movie.release_date && (
            <View className="flex-row items-center gap-2">
              <CalendarDays color="#ab8bff" className="mr-1" />
              <Text className="text-[#ccc]">{movie.release_date}</Text>
            </View>
          )
        }

        {movie.runtime && (
          <View className="flex-row items-center gap-2">
            <AlarmClock color="#ab8bff" className="mr-1" />
            <Text className="text-[#ccc]">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </Text>
          </View>
        )}

        {movie.vote_average && (
          <View className="flex-row items-center ">
            <Image source={icons.star} className="w-4 h-4" resizeMode="contain" />
            <Text className="text-[#ccc] ml-1">
              {(movie.vote_average / 2).toFixed(1)}/5.0 ({movie.vote_count || 0})
            </Text>
          </View>
        )}
      </View>

      {movie.genres?.length > 0 && (
        <View className="px-5 mt-5">
          <Text className="text-white text-2xl font-semibold mb-2">Genres</Text>
          <View className="flex-row flex-wrap gap-2">
            {movie.genres.map((g: any) => (
              <View key={g.id} className="bg-[#1a0a4a] rounded-full py-1 px-3">
                <Text className="text-accent text-lg">{g.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {movie.overview && (
        <View className="px-5 mt-5">
          <Text className="text-white text-2xl font-semibold mb-2">Overview</Text>
          <Text className="text-slate-400 text-lg leading-5">{movie.overview}</Text>
        </View>
      )}

      {movie.production_companies?.length > 0 && (
        <View className="px-5 mt-5">
          <Text className="text-white text-2xl font-semibold mb-2">Production</Text>
          <View className="flex-row flex-wrap gap-3 justify-center items-center bg-white/10 rounded-2xl p-3">
            {movie.production_companies.map((company: any) => (
              <View key={company.id} className="items-center mr-2">
                {company.logo_path ? (
                  <Image
                    source={{ uri: `${imageBase}${company.logo_path}` }}
                    className="w-32 h-16 text-lg font-semibold mb-2"
                    resizeMode="contain"
                    alt={company.name}
                  />
                ) : (
                  <Text className="text-[#d0d0d0] text-lg font-semibold mb-2">{company.name}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {movie.production_countries?.length > 0 && (
        <View className="px-5 mt-5">
          <Text className="text-white text-2xl font-semibold mb-2">Countries</Text>
          <View className="flex-1">
            {movie.production_countries.map((c: any) => (
              <Text
                key={c.iso_3166_1}
                className="text-slate-400 text-lg font-semibold mb-2"
              >
                {c.name} {getFlagEmoji(c.iso_3166_1)}
              </Text>
            ))}
          </View>
        </View>
      )}

      {movie.spoken_languages?.length > 0 && (
        <View className="px-5 mt-5">
          <Text className="text-white text-2xl font-semibold mb-2">Languages</Text>
          <Text className="text-slate-400 text-lg">
            {movie.spoken_languages.map((l: any) => l.english_name).join(", ")}
          </Text>
        </View>
      )}

      {(movie.budget > 0 || movie.revenue > 0) && (
        <View className="px-5 mt-5">
          <Text className="text-white text-2xl font-semibold mb-3">Financial Info</Text>
          <View className="bg-white/10 rounded-2xl p-4 space-y-3 flex-1 gap-2">
            {movie.budget > 0 && (
              <View className="flex-row items-center justify-between bg-white/5 px-4 py-3 rounded-xl" >
                <Text className="text-[#d0d0d0] font-medium">Budget</Text>
                <Text className="text-white font-medium">{`$${movie.budget.toLocaleString()}`}</Text>
              </View>
            )}
            {movie.revenue > 0 && (
              <View className="flex-row items-center justify-between bg-white/5 px-4 py-3 rounded-xl" >
                <Text className="text-[#d0d0d0]  font-medium">Revenue</Text>
                <Text className="text-white font-medium">{`$${movie.revenue.toLocaleString()}`}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {movie.belongs_to_collection && (
        <View className="px-5 mt-5 items-center">
          <Text className="text-white text-2xl font-semibold mb-3">Part of Collection</Text>
          <Image
            source={{ uri: `${imageBase}${movie.belongs_to_collection.poster_path}` }}
            className="w-[150px] h-[220px] rounded-xl mb-2"
            resizeMode="cover"
          />
          <Text className="text-white text-lg font-medium text-center">
            {movie.belongs_to_collection.name}
          </Text>
        </View>
      )}

      {(movie.homepage || movie.imdb_id) && (
        <View className="px-5 mt-6 mb-10">
          <Text className="text-white text-2xl font-semibold mb-4">More Info</Text>

            <View className="bg-white/10 rounded-2xl p-4 space-y-3 flex-1 gap-2">
              {movie.homepage && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => Linking.openURL(movie.homepage as string)}
                  className="flex-row items-center justify-between bg-white/5 px-4 py-3 rounded-xl"
                >
                  <View className="flex-row items-center space-x-3">
                    <Text className="text-white text-base font-medium">Official Homepage</Text>
                  </View>
                  <Text className="text-[#7b46e4] text-sm font-semibold">Visit</Text>
                </TouchableOpacity>
              )}

              {movie.imdb_id && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.imdb_id}`)}
                  className="flex-row items-center justify-between bg-white/5 px-4 py-3 rounded-xl"
                >
                  <View className="flex-row items-center space-x-3">
                    <Text className="text-white text-base font-medium">View on IMDb</Text>
                  </View>
                  <Text className="text-[#f5c518] text-sm font-semibold">Open</Text>
                </TouchableOpacity>
              )}
            </View>
        </View>
      )}

    </ScrollView>
  );
};

export default MovieDetails;
