import BackButton from "@/atoms/BackButton";
import { Stack } from "expo-router";

export default function MovieDetailsLayout() {
    return (
        <Stack
            screenOptions={{
                headerTransparent: true,
                headerLeft: () => <BackButton />,
                headerTitle: "",
            }}
        />
    );
}
