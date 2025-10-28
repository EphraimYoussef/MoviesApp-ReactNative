import { View, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons';

interface SearshBarProps {
	placeholder: string;
	onPress?: () => void;
}

const SearchBar = ({placeholder , onPress} : SearshBarProps) => {
	return (
		<View className='flex-row items-center bg-dark-200 rounded-full p-5'>
				<Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
				<TextInput 
					onPress={onPress}
					placeholder={placeholder}
					value=''
					onChangeText={ () => {} }
					placeholderTextColor="#a8b5db"
					className='flex-1 ml-2 text-white'
				/>
		</View>
	)
}

export default SearchBar