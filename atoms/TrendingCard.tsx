import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'
import RankingBadge from './RankingBadge';
import { updateCountByMovieId } from '@/services/appWrite';

const TrendingCard = ({movie , index} : {movie: TrendingMovie , index: number}) => {
    return (
        <Link href={`/movies/${movie.movieId}`} asChild>
            <TouchableOpacity 
                className={`w-36 h-96 relative rounded-lg gap-5 mt-5`}
                onPress={() => updateCountByMovieId(movie.movieId)}
            >
                <Image
                    source={{ uri: movie.posterURL }}
                    className="w-full h-60 rounded-lg"
                    resizeMode="cover"
                />

                <View className="absolute shadow-black shadow-2xl top-0 left-0">
                    <RankingBadge index={index} />
                </View>

                <View className='flex-1 gap-1'>
                    <Text className='text-white font-bold text-lg mb-1' numberOfLines={1}>
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
                        {movie?.releaseYear} • {movie?.lang.toUpperCase()}
                    </Text>

                </View>

            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard