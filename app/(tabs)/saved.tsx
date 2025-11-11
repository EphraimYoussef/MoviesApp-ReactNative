import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const Saved = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return( 
      <View className="flex-1 bg-primary">
        <Image source = {images.bg} className="absolute w-full z-0" />
        <ScrollView className="flex-1 px-5" 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
          <View className="flex-1 items-center justify-center ">
            <ActivityIndicator
              size="large"
              color="#ab8bff"
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source = {images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
      <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

      {	
        isSignedIn ? (
          <View>
            {/* TODO: Show user's saved movies */}
            <Text className="text-2xl font-bold text-accent mx-auto">Logged in</Text>
          </View>
        ) : (
          <View className='flex-1 items-center mt-32 px-6'>
            <View className='bg-violet-600/10 rounded-full p-8 mb-6 border-2 border-violet-600/20'>
              <Ionicons name="lock-closed" size={64} color="#8b5cf6" />
            </View>
            
            <Text className='text-white text-2xl font-bold mb-2 text-center'>
              Authentication Required
            </Text>

            <Text className='text-gray-400 text-center mb-8 px-4 leading-6'>
              You need to be signed in to see {'\n'}
              your saved movies.
            </Text>

            <Link
              href="/profile"
              className='bg-violet-600 px-8 py-4 rounded-2xl shadow-lg active:scale-95'
            >
              <View className='flex-row items-center gap-2'>
                <Ionicons name="person-add" size={18} color="white" />
                <Text className='text-white text-lg font-semibold'>
                  Go to Login
                </Text>
              </View>
            </Link>
          </View>
        )
      }

      </ScrollView>
    </View>
  )
}

export default Saved