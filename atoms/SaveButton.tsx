import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function SaveButton() {
    const [saved, setSaved] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => setSaved(!saved)}
            activeOpacity={0.7}
        >
            <BlurView
                intensity={50}
                tint="light"
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-md overflow-hidden"
            >
                <Ionicons
                name = {saved ? "bookmark" : "bookmark-outline"}
                size = {24}
                color = {saved ? "#ab8bff" : "#F8F8FF"}
                />
            </BlurView>
        </TouchableOpacity>
    );
}
