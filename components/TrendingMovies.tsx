import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TrendingCard from '@/atoms/TrendingCard'
import { useFonts } from 'expo-font';

const TrendingMovies = ({movies} : {movies : TrendingMovie[]}) => {

    const [fontsLoaded] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    });

    if (!fontsLoaded){ return null;}

    return (
        <View className="flex-1 mt-10">
            <Text className="text-white text-4xl" style={{ fontFamily: 'BebasNeue-Regular' }}>Trending Movies</Text>
            <FlatList
                data={movies}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ () => <View className='w-6'/> }
                renderItem={ ({ item , index }) => <TrendingCard movie={item} index={index} /> }
                keyExtractor={(item) => item.movieId.toString() + item.title + item.searchTerm}
            />
        </View>
    )
}

export default TrendingMovies