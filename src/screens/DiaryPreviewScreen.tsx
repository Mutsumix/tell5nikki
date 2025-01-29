import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
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
    <View style={styles.content}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.title}>日記プレビュー</Text>

        {QUESTIONS.map(question => (
          answers[question.id] ? (
            <View key={question.id} style={styles.answerContainer}>
              <Text style={styles.questionText}>{question.text}</Text>
              <Text style={styles.answerText}>{answers[question.id]}</Text>
            </View>
          ) : null
        ))}

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>保存する</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl * 2,
  },
  title: {
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
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
  answerContainer: {
    marginBottom: theme.spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 15,
    padding: theme.spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  questionText: {
    fontSize: 13,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
    opacity: 0.7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  answerText: {
    fontSize: 18,
    color: theme.colors.text,
    lineHeight: 24,
    fontWeight: '400',
  },
  saveButton: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    width: '80%',
    alignSelf: 'center',
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
