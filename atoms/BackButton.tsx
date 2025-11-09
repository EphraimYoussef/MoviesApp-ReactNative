import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function BackButton() {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="w-10 h-10 flex items-center justify-center"
            >
            <ChevronLeft size={25} color="#F8F8FF" />
        </TouchableOpacity>
    );
}
