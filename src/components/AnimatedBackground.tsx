import React, { useEffect, createContext, useContext } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
const { width, height } = Dimensions.get('window');

// アニメーション状態を共有するためのContext
export const AnimationContext = createContext<Animated.Value>(new Animated.Value(0));

export const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const animatedValue = useContext(AnimationContext);

  useEffect(() => {
    const animate = () => {
      const randomDuration = () => Math.random() * 4000 + 3000;
      
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: Math.random(),
          duration: randomDuration(),
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: Math.random(),
          duration: randomDuration(),
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const animatedColors = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#3E4C6B', '#9BA4B4', '#3E4C6B'],
  });

  return (
    <AnimationContext.Provider value={animatedValue}>
      <AnimatedGradient
        colors={[animatedColors, '#3E4C6B']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </AnimatedGradient>
    </AnimationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
}); 