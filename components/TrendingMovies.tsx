import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TrendingCard from '@/atoms/TrendingCard'

const TrendingMovies = ({movies} : {movies : TrendingMovie[]}) => {
    return (
        <View className="flex-1 mt-10">
            {
                movies.length > 0 &&
                <Text className="text-white text-3xl font-semibold">Trending Movies</Text>
            }
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