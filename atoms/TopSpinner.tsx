import { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";

export const TopSpinner = ({ scrollY }: { scrollY: Animated.Value }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue  = useRef(new Animated.Value(0)).current;
  const [isReleaseReady, setIsReleaseReady] = useState(false);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value < 0) {
        const progress = Math.min(Math.abs(value) / 100, 1);
        rotateValue.setValue(progress * 360);               
        scaleValue.setValue(progress);                      
        setIsReleaseReady(Math.abs(value) >= 100);          
      } 
      else {
        rotateValue.setValue(0);
        scaleValue.setValue(0);
        setIsReleaseReady(false);
      }
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
        opacity: scaleValue,
      }}
      className="absolute top-16 left-0 right-0 items-center justify-center z-20"
    >
      <Animated.View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 3,
          borderTopColor: "#ab8bff",
          borderRightColor: "#ab8bff50",
          borderBottomColor: "#ab8bff30",
          borderLeftColor: "#ab8bff50",
          transform: [{ rotate }],
        }}
      />

      <Text className="text-[#ab8bff] mt-3 font-semibold text-sm tracking-wide">
        {isReleaseReady ? "Release!" : "↓ Pull down"}
      </Text>
    </Animated.View>
  );
};
