import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = (data: any) => {
    console.log(isLogin ? "Login" : "Signup", data);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-center items-center px-6">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="w-full items-center mb-20"
            pointerEvents="box-none"
          >
            <BlurView intensity={70} tint="dark" className="w-full rounded-3xl overflow-hidden border border-white/10">
              <View className="p-7">
                <TouchableOpacity
                  onPress={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full bg-white/10 z-10"
                  activeOpacity={0.7}
                >
                  <X size={20} color="white" />
                </TouchableOpacity>

                

                {isLogin ? (
                  <LoginForm
                    onSubmit={handleSubmit}
                    onSwitchToSignup={() => setIsLogin(false)}
                  />
                ) : (
                  <SignupForm
                    onSubmit={handleSubmit}
                    onSwitchToLogin={() => setIsLogin(true)}
                  />
                )}
              </View>
            </BlurView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default AuthModal;
