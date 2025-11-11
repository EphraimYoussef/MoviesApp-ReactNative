import { View, Text, Image, ScrollView, ActivityIndicator, RefreshControl, Animated } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { getSavedMovies } from '@/services/appWrite';
import SavedList from '@/components/SavedList';
import { TopSpinner } from '@/atoms/TopSpinner';

const Saved = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [movies, setMovies] = useState<any[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [errorMovies, setErrorMovies] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchSavedMovies = useCallback(async () => {
    if (!isLoaded || !isSignedIn || !user?.id){
      return;
    }

    try {
      setErrorMovies(null);
      const data = await getSavedMovies(user.id);
      setMovies(data || []);
    } 
    catch (error) {
      console.error('Error fetching saved movies:', error);
      setErrorMovies('Failed to fetch movies');
    } 
    finally {
      setLoadingMovies(false);
      setRefreshing(false);
    }
  }, [isLoaded, isSignedIn, user?.id]);

  useEffect(() => {
  if (isLoaded && isSignedIn) {
    fetchSavedMovies();
  }
}, [isLoaded, isSignedIn]);


  const onRefresh = useCallback(() => {
    setErrorMovies(null);
    setLoadingMovies(true);
    setRefreshing(true);
    fetchSavedMovies();
  }, [fetchSavedMovies]);

  if (!isSignedIn) {
    return (
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        >
          <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
          <View className="flex-1 items-center mt-32 px-6">
            <View className="bg-violet-600/10 rounded-full p-8 mb-6 border-2 border-violet-600/20">
              <Ionicons name="lock-closed" size={64} color="#8b5cf6" />
            </View>

            <Text className="text-white text-2xl font-bold mb-2 text-center">
              Authentication Required
            </Text>

            <Text className="text-gray-400 text-center mb-8 px-4 leading-6">
              You need to be signed in to see {'\n'}
              your saved movies.
            </Text>

            <Link
              href="/profile"
              className="bg-violet-600 px-8 py-4 rounded-2xl shadow-lg active:scale-95"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="person-add" size={18} color="white" />
                <Text className="text-white text-lg font-semibold">Go to Login</Text>
              </View>
            </Link>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <Animated.View className="flex-1 bg-primary">

      <TopSpinner scrollY={scrollY} />

      <Image source={images.bg} className="absolute w-full z-0" />
      <Animated.ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ab8bff']}
            tintColor="#ab8bff"
          />
        }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
        {
            !isLoaded || loadingMovies ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#ab8bff" />
              </View>
            ) : errorMovies ? (
              <Text className="text-white text-center">
                Failed to load saved movies. Pull down to retry.
              </Text>
            ) : movies && movies.length > 0 ? (
            <SavedList movies={movies} />
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <View className="bg-slate-800/50 rounded-full p-8 mb-4">
                <Ionicons name="bookmark-outline" size={64} color="#64748b" />
              </View>
              <Text className="text-white text-xl font-semibold mb-2">
                No saved movies yet
              </Text>
              <Text className="text-gray-400 text-center px-6">
                Start exploring and bookmark your favorite movies to see them here
              </Text>
            </View>
          )
        }
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default Saved;
