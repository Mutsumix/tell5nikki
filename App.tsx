import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { QuestionsScreen } from './src/screens/QuestionsScreen';
import { DiaryPreviewScreen } from './src/screens/DiaryPreviewScreen';
import { DiaryListScreen } from './src/screens/DiaryListScreen';
import { theme } from './src/styles/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          cardStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '今日の日記' }}
        />
        <Stack.Screen
          name="Questions"
          component={QuestionsScreen}
          options={{ title: '5つの質問' }}
        />
        <Stack.Screen
          name="DiaryPreview"
          component={DiaryPreviewScreen}
          options={{ title: '日記プレビュー' }}
        />
        <Stack.Screen
          name="DiaryList"
          component={DiaryListScreen}
          options={{ title: '日記一覧' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
