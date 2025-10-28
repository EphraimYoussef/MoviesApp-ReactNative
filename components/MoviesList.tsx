import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MovieCard from '@/atoms/MovieCard'

const MoviesList = ({ movies }: { movies: any[] }) => {
    return (
        <View className="flex-1 my-10">
            <Text className="text-white text-2xl font-bold mb-5">Latests Movies</Text>
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
                ListFooterComponent={<View style={{ height: 30 }} />}
                columnWrapperClassName='flex-start gap-5 mb-5'
            />
        </View>
    )
}

export default MoviesList
