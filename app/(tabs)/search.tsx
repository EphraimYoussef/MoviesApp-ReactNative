import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const search = () => {
  return (
    <View className="flex-1 bg-primary">
			<Image source = {images.bg} className="absolute w-full z-0" />
			<ScrollView className="flex-1 px-5" 
			showsVerticalScrollIndicator={false} 
			contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
			<Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
			<Text className="text-2xl font-bold text-accent mx-auto">Search Screen</Text>
			</ScrollView>
		</View>
  )
}

export default search