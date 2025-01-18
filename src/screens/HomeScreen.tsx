import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { AppNavigationProp } from '../types/navigation';

export const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日の振り返り</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Questions')}
      >
        <Text style={styles.buttonText}>日記を書く</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.startButton, styles.listButton]}
        onPress={() => navigation.navigate('DiaryList')}
      >
        <Text style={styles.buttonText}>過去の日記を見る</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    alignItems: 'center',
    paddingTop: '50%',
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
  listButton: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.secondary,
  },
});
