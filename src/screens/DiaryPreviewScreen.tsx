import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, AppNavigationProp } from '../types/navigation';
import { theme } from '../styles/theme';
import { storageUtils } from '../utils/storage';
import { QUESTIONS } from '../types/diary';

type DiaryPreviewRouteProp = RouteProp<RootStackParamList, 'DiaryPreview'>;

export const DiaryPreviewScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<DiaryPreviewRouteProp>();
  const { answers } = route.params;

  const handleSave = async () => {
    try {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        answers,
        createdAt: new Date().toISOString(),
      };

      await storageUtils.saveDiaryEntry(entry);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving diary:', error);
      alert('保存中にエラーが発生しました');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>日記プレビュー</Text>

      {QUESTIONS.map(question => (
        answers[question.id] ? (
          <View key={question.id} style={styles.answerContainer}>
            <Text style={styles.questionText}>{question.text}</Text>
            <Text style={styles.answerText}>{answers[question.id]}</Text>
          </View>
        ) : null
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>保存する</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },
  answerContainer: {
    marginBottom: theme.spacing.xl,
  },
  questionText: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  answerText: {
    fontSize: 18,
    color: theme.colors.text,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
  },
});
