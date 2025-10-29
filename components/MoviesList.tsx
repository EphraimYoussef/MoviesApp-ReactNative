import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MovieCard from '@/atoms/MovieCard'
import { useFonts } from 'expo-font';

const MoviesList = ({ movies }: { movies: any[] }) => {
    const [fontsLoaded] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    });

    if (!fontsLoaded){ return null;}

    return (
        <View className="flex-1 mb-20 ">
            <Text className="text-white text-4xl mb-5" style={{ fontFamily: 'BebasNeue-Regular' }}>Latests Movies</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperClassName='flex-start gap-5 mb-5'
            />
        </View>
    )
}

export default MoviesList
