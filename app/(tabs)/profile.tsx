import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, { useState } from 'react'
import AuthModal from '@/components/AuthModal'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

const Profile = () => {
	const [showAuth, setShowAuth] = useState(false);

  return (
		<View className="flex-1 bg-primary">
			<Image source = {images.bg} className="absolute w-full z-0" />
			<ScrollView className="flex-1 px-5" 
				showsVerticalScrollIndicator={false} 
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
				>
				<Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
				<View className='flex items-center justify-center h-60'>
					<TouchableOpacity
						className='bg-light-100 px-4 py-2 rounded-xl'
						onPress={() => setShowAuth(true)}
					>
						<Text className='text-primary text-2xl font-semibold ' >Login / Signup</Text>
					</TouchableOpacity>
				</View>

				<AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
			</ScrollView>
    </View>
  );
}

export default Profile