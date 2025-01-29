import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated, Easing } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { QuestionsScreen } from './src/screens/QuestionsScreen';
import { DiaryPreviewScreen } from './src/screens/DiaryPreviewScreen';
import { DiaryListScreen } from './src/screens/DiaryListScreen';
import { AnimatedBackground } from './src/components/AnimatedBackground';

const Stack = createStackNavigator();

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1],
    })
  }
});

const App = () => {
  return (
    <AnimatedBackground>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardStyleInterpolator: forFade,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 400,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  useNativeDriver: true,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 400,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  useNativeDriver: true,
                },
              },
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Questions" component={QuestionsScreen} />
          <Stack.Screen name="DiaryPreview" component={DiaryPreviewScreen} />
          <Stack.Screen name="DiaryList" component={DiaryListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AnimatedBackground>
  );
};

export default App;
