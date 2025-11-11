import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { icons } from "@/constants/icons";
import { useSignUp, useOAuth, useClerk } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

    const { signUp, isLoaded: signUpLoaded } = useSignUp();
    const { setActive } = useClerk();
    const googleOAuth = useOAuth({ strategy: "oauth_google" });
    const appleOAuth = useOAuth({ strategy: "oauth_apple" });



  const handleSignUp = async (data: SignupFormData) => {
  if (!signUpLoaded) return;

  try {
    // 1️⃣ Create the user
    const signUpResult = await signUp.create({
      emailAddress: data.email,
      password: data.password,
      firstName: data.name,
    });

    console.log(data);
    console.log(signUpResult);
    
    // 2️⃣ Set the active session using setActive from useClerk
    if (signUpResult.createdSessionId) {
      await setActive({ session: signUpResult.createdSessionId });
      Alert.alert("Signup successful!", "You are now logged in.");
    } else {
      Alert.alert("Signup failed", "Could not create session");
    }

  } catch (err: any) {
    console.error("Signup error:", err);
    Alert.alert("Sign up failed", err.errors?.[0]?.message || err.message);
  }
};



  const handleGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth.startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
      else{
        Alert.alert("Google login failed", "Something went wrong");
      }
    }
    catch (err : any) {
      Alert.alert("Google login failed", err.errors?.[0]?.message || err.message);
      return;
    }
  };


  const handleApple = async () => {
    try {
      const { createdSessionId, setActive } = await appleOAuth.startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
      else{
        Alert.alert("Apple login failed", "Something went wrong");
      }
    } 
    catch (err : any) {
      Alert.alert("Apple login failed", err.errors?.[0]?.message || err.message);
      return;
    }
  };


  return (
    <View>
      <Text className="text-white text-3xl font-bold text-center mt-2 mb-6">
        Sign Up
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2 border border-white/20"
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <View className="flex h-7">
        {errors.name && <Text className="text-red-500 mb-2 text-sm ml-3">{errors.name.message}</Text>}
      </View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2 border border-white/20"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      <View className="flex h-7">
        {errors.email && <Text className="text-red-500 text-sm ml-3 ">{errors.email.message}</Text>}
      </View>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2 border border-white/20"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      
        <View className="flex h-7">
          {errors.password && <Text className="text-red-500 text-sm ml-3"> {errors.password.message} </Text>}
        </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleSubmit(handleSignUp)}
        className="mt-2 shadow-md rounded-xl bg-violet-300 py-3"
      >
        <Text className="text-[#1a0a4a] font-bold text-center">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-white/20" />
        <Text className="text-gray-400 mx-3 text-sm">OR</Text>
        <View className="flex-1 h-[1px] bg-white/20" />
      </View>

      <View className="flex justify-center gap-3">
        <TouchableOpacity
          onPress={handleGoogle}
          activeOpacity={0.8}
          className="bg-white rounded-xl px-5 py-3 flex-row justify-center items-center gap-2"
        >
          <Text className="font-bold">Continue with Google</Text>
          <Image source={icons.google} className="w-5 h-5" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleApple}
          activeOpacity={0.8}
          className="rounded-xl px-5 py-3 flex-row justify-center items-center gap-2 bg-black"
        >
          <Text className="text-white font-bold">Continue with Apple</Text>
          <Image source={icons.apple} className="w-5 h-5" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-300">Already have an account?</Text>
        <TouchableOpacity onPress={onSwitchToLogin}>
          <Text className="text-accent font-semibold ml-1">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupForm;
