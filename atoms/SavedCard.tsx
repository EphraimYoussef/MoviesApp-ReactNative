import { Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'
import { updateCountByMovieId } from '@/services/appWrite'

const SavedCard = ({movie} : {movie: SavedMovie}) => {
  return (
    <Link href={`/movies/${movie.movieId}`} asChild>
      <TouchableOpacity 
          className='w-[30%]'
          onPress={() => updateCountByMovieId(Number(movie.movieId))}
      >
        <Image 
          source={{
            uri: movie.posterURL ?
            movie.posterURL
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
              {movie.rate}
            </Text>
          </View>
          <Text className='text-gray-400 text-sm' numberOfLines={1}>
            {movie.releaseYear} • {movie.lang.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default SavedCard