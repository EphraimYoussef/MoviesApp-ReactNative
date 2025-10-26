import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter(); 


  return (
    <View className="flex-1 bg-primary">
      <Image source = {images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar 
            placeholder="Search movies..."
            onPress={ () => { router.push("/search") } }
          />
        </View>
        <View className="flex-1 mt-10 mb-20">
          <Text className="text-2xl font-bold text-accent mx-auto" >Home Screen</Text>
        </View>
      </ScrollView>
    </View>
  );
}
