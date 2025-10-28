import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import useFetch from '@/hooks/useFetch'
import { fetchMovies } from '@/services/TMDB_API'
import MovieCard from '@/atoms/MovieCard'
import SearchBar from '@/atoms/SearchBar'

const Search = () => {
	

	const { 
		data : movies,
		loading,
		error 
	} = useFetch(
		() => fetchMovies({query: ""})
	);

	return (
		<View className="flex-1 bg-primary">
			<Image source = {images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
			<FlatList 
				data={movies?.results}
				renderItem={({ item }) => (<MovieCard movie={item} />)}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				contentContainerStyle={{paddingBottom: 80 }}
				columnWrapperClassName='gap-5 mb-5 justify-start px-5'
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center mt-20">
							<Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto" />
						</View>

						<View className="px-5 mb-10">
							<SearchBar placeholder="Search movies..." />
						</View>

						{
							loading && (
								<ActivityIndicator size="large" color="#0000ff" className="my-3 self-center" />
							)
						}

						{
							error && (
								<Text className="text-red-500 text-center my-3 px-5 text-bold">
									Error: {error?.message}
								</Text>
							)
						}


						{
							!loading && !error && "SEARCH RESULTS".trim() && movies?.results.length > 0 && (
								<Text className="text-white text-xl font-bold mb-5 px-5 gap-3">
									Search Results for {" "}
									<Text className="text-accent">SEARCH TERM</Text>
								</Text>
							)
						}
					</>
				}
				>
			</FlatList>
		</View>
	)
}

export default Search