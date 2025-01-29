import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { AppNavigationProp } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
const { width, height } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animate = () => {
      const randomDuration = () => Math.random() * 4000 + 3000;
      
      const randomMiddleColor = () => {
        const baseColor = 0x3E4C6B;
        const targetColor = 0x9BA4B4;
        const random = Math.random();
        const r = Math.floor(((targetColor >> 16) - (baseColor >> 16)) * random + (baseColor >> 16));
        const g = Math.floor((((targetColor >> 8) & 0xFF) - ((baseColor >> 8) & 0xFF)) * random + ((baseColor >> 8) & 0xFF));
        const b = Math.floor(((targetColor & 0xFF) - (baseColor & 0xFF)) * random + (baseColor & 0xFF));
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
      };

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

  const onPressIn = (ref: any) => {
    Animated.spring(ref, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (ref: any) => {
    Animated.spring(ref, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const scaleAnim = new Animated.Value(1);

  return (
    <AnimatedGradient
      colors={[animatedColors, '#3E4C6B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>今日の振り返り</Text>
        <AnimatedTouchable
          style={[
            styles.startButton,
            { transform: [{ scale: scaleAnim }] }
          ]}
          onPressIn={() => onPressIn(scaleAnim)}
          onPressOut={() => onPressOut(scaleAnim)}
          onPress={() => navigation.navigate('Questions')}
        >
          <Text style={styles.buttonText}>日記を書く</Text>
        </AnimatedTouchable>

        <TouchableOpacity
          style={[styles.startButton, styles.listButton]}
          onPress={() => navigation.navigate('DiaryList')}
        >
          <Text style={styles.buttonText}>過去の日記を見る</Text>
        </TouchableOpacity>
      </View>
    </AnimatedGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 40,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  listButton: {
    backgroundColor: theme.colors.secondary,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.12,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
