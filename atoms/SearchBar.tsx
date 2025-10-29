import { View, Image, TextInput } from 'react-native';
import React, { forwardRef } from 'react';
import { icons } from '@/constants/icons';

interface SearchBarProps {
	placeholder: string;
	onPress?: () => void;
	value?: string;
	onChangeText?: (text: string) => void;
	editable?: boolean;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
	({ placeholder, onPress, value, onChangeText, editable = true }, ref) => {
		return (
		<View className="flex-row items-center bg-dark-200 rounded-full p-5">
			<Image
			source={icons.search}
			className="size-5"
			resizeMode="contain"
			tintColor="#ab8bff"
			/>
			<TextInput
			ref={ref}
			onPress={onPress}
			placeholder={placeholder}
			editable={editable}
			value={value}
			onChangeText={onChangeText}
			placeholderTextColor="#a8b5db"
			className="flex-1 ml-2 text-white"
			/>
		</View>
		);
	}
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
