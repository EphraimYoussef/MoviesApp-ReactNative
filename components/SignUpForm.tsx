import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { icons } from "@/constants/icons";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onSwitchToLogin }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleGoogle = () => console.log("Sign up with Google");
  const handleApple = () => console.log("Sign up with Apple");

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
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-3 border border-white/20"
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text className="text-red-500 mb-2">{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-3 border border-white/20"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text className="text-red-500 mb-2">{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-xl mb-3 border border-white/20"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text className="text-red-500 mb-2">{errors.password.message}</Text>}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleSubmit(onSubmit)}
        className="mt-5 shadow-md rounded-xl bg-violet-300 py-3"
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
