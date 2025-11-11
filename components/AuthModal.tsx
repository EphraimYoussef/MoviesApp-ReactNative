import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-center items-center px-6">
        <TouchableWithoutFeedback>
          <BlurView intensity={70} tint="dark" className="w-full rounded-3xl overflow-hidden border border-white/10">
            <View className="p-7">
              <TouchableOpacity
                onPress={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-white/10 z-10"
                activeOpacity={0.7}
              >
                <X size={20} color="white" />
              </TouchableOpacity>
              {
                isLogin ? (
                  <LoginForm
                    onSwitchToSignup={() => setIsLogin(false)}
                  />
                ) : (
                  <SignupForm
                    onSwitchToLogin={() => setIsLogin(true)}
                  />
                )
              }
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default AuthModal;
