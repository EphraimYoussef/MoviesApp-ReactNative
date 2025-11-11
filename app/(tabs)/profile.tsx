import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import AuthModal from '@/components/AuthModal'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { useUser } from "@clerk/clerk-expo";
import ProfileDetails from '@/components/ProfileDetails';
import { Ionicons } from '@expo/vector-icons';


const Profile = () => {
	const [showAuth, setShowAuth] = useState(false);
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
				<Image source={icons.logo} className="w-12 h-10 mt-20  mx-auto" />

				{	
					isSignedIn ? (
						<ProfileDetails />
					) : (
						<View className='flex-1 items-center justify-start px-6 mt-32'>
							<View className='bg-violet-600/10 rounded-full p-8 mb-6 border-2 border-violet-600/20'>
								<Ionicons name="person" size={64} color="#8b5cf6" />
							</View>
							
							<Text className='text-white text-2xl font-bold mb-3 text-center'>
								Welcome to Movie App 
							</Text>
							<Text className='text-gray-400 text-center mb-8 px-4 '>
								Sign in to access your profile and {'\n'}
								your saved movies and more
							</Text>
							
							<TouchableOpacity
								className='bg-violet-600 px-8 py-4 rounded-2xl shadow-lg active:scale-95'
								onPress={() => setShowAuth(true)}
							>
								<View className='flex-row items-center gap-2'>
									<Ionicons name="log-in-outline" size={24} color="white" />
									<Text className='text-white text-lg font-semibold'>
										Login / Sign Up
									</Text>
								</View>
							</TouchableOpacity>
							
							<AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
						</View>
					)
				}
				

			</ScrollView>
    </View>
  );
}

export default Profile