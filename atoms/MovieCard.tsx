import { Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'
import { TMDB_CONFIG } from '@/config/TMDB_Config'

const MovieCard = ({movie} : {movie: Movie}) => {
    return (
        <Link href={`/movies/${movie.id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image 
                    source={{
                        uri: movie.poster_path ?
                        `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`
                        : 'https://placehold.co/500x750/1e293b/94a3b8?text=Poster+Unavailable'
                    }} 
                    className='w-full h-52 rounded-lg mb-2' 
                    resizeMode='cover' 
                />
                <View className='flex-1 gap-1'>
                    <Text className='text-white font-bold text-base mb-1' numberOfLines={1}>
                        {movie.title}
                    </Text>
                    <View className='flex-row items-center gap-1'>
                        <Image 
                            source={icons.star} 
                            className='w-4 h-4' 
                            resizeMode='contain'
                        />
                        <Text className='font-semibold text-white text-base'>
                            {(movie.vote_average / 2).toFixed(1)}
                        </Text>
                    </View>
                    <Text className='text-gray-400 text-sm' numberOfLines={1}>
                        {movie?.release_date.split('-')[0]} • {movie?.original_language.toUpperCase()}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard