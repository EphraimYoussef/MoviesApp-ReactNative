import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SavedCard from '@/atoms/SavedCard'
import { Ionicons } from '@expo/vector-icons'

const SavedList = ({ movies }: { movies: SavedMovie[] | null }) => {
  return (
    <View className="flex-1 mb-20 mt-10">
      <View className="mb-6">
        <View className="flex-row items-center gap-3 mb-3">
          <View className="bg-violet-600/20 rounded-full p-2">
            <Ionicons name="bookmark" size={24} color="#8b5cf6" />
          </View>
          <Text className="text-white text-3xl font-bold">
            Saved Movies
          </Text>
        </View>
        
        <View className="flex-row items-center gap-2">
          <View className="bg-slate-800 rounded-full px-4 py-2 border border-slate-700">
            <Text className="text-gray-400 text-sm">
              <Text className="text-violet-400 font-semibold">{movies?.length || 0}</Text>
              <Text className="text-gray-400">{' '}{movies?.length === 1 ? 'movie' : 'movies'} saved </Text>
            </Text>
          </View>
        </View>
      </View>
        <FlatList
          data={movies}
          renderItem={({ item }) => <SavedCard movie={item} />}
          keyExtractor={(item) => item.movieId.toString()}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperClassName='flex-start gap-5 mb-5'
          contentContainerStyle={{ paddingBottom: 20 }}
        />
    </View>
  )
}

export default SavedList