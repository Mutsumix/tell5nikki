import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { QUESTIONS } from '../types/diary';
import { AppNavigationProp } from '../types/navigation';

export const QuestionsScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = QUESTIONS[currentIndex];

  const handleNext = () => {
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      alert('この質問は必須です');
      return;
    }

    if (currentIndex === QUESTIONS.length - 1) {
      navigation.navigate('DiaryPreview', { answers });
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressBar}>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {QUESTIONS.length}
        </Text>
      </View>

      <Text style={styles.question}>{currentQuestion.text}</Text>

      <TextInput
        style={styles.input}
        value={answers[currentQuestion.id] || ''}
        onChangeText={(text) =>
          setAnswers(prev => ({ ...prev, [currentQuestion.id]: text }))
        }
        multiline
        placeholder="ここに入力してください..."
        placeholderTextColor={theme.colors.secondary}
      />

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentIndex === QUESTIONS.length - 1 ? '完了' : '次へ'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  progressBar: {
    marginBottom: theme.spacing.lg,
  },
  progressText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  question: {
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: theme.spacing.md,
    color: theme.colors.text,
    minHeight: 100,
    marginBottom: theme.spacing.xl,
  },
  nextButton: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
  },
});
