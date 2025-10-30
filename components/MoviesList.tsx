import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MovieCard from '@/atoms/MovieCard'

const MoviesList = ({ movies }: { movies: any[] }) => {

    return (
        <View className="flex-1 mb-20 ">
            <Text className="text-white text-3xl font-semibold mb-5">Latests Movies</Text>
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
