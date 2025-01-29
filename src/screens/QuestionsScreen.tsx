import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
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
    <View style={styles.content}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  progressText: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  question: {
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: theme.spacing.md,
    color: theme.colors.text,
    minHeight: 100,
    marginBottom: theme.spacing.xl,
    width: '100%',
  },
  nextButton: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
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
    fontSize: 18,
    fontWeight: '500',
  },
});
