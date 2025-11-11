import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { isSaved, saveMovie, unsaveMovie } from "@/services/appWrite";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";



export default function SaveButton(movie : any) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.id) {
      isSaved(movie.movie.id.toString(), user.id)
        .then(setSaved)
        .catch(console.error);
    }
  }, [movie, user?.id]);

  const handlePress = async () => {
    if (!isSignedIn) {
      Alert.alert(
        'Login Required',
        'You need to log in to save movies.',
        [
          { text: 'Close', style: 'cancel' },
          {
            text: 'Login',
            style: 'default',
            onPress: () => router.push('/profile')
          }
        ]
      );
      return;
    }

    if (!user?.id) {
      return;
    }

    try {
      if (saved) {
        const success = await unsaveMovie(movie.movie.id.toString(), user.id);
        if (success) {
          setSaved(false);
        }
      } 
      else {
        const success = await saveMovie(movie.movie, user.id);
        if (success) {
          setSaved(true);
        }
      }
    } 
    catch (error) {
      console.error("Error toggling saved movie:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <BlurView
        intensity={50}
        tint="light"
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-md overflow-hidden"
      >
        <Ionicons
          name  = {saved ? "bookmark" : "bookmark-outline"}
          size  = {24}
          color = {saved ? "#ab8bff" : "#F8F8FF"}
        />
      </BlurView>
    </TouchableOpacity>
  );
}
