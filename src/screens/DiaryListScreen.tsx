import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../styles/theme';
import { storageUtils } from '../utils/storage';
import { DiaryEntry } from '../types/diary';

export const DiaryListScreen = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const data = await storageUtils.getAllEntries();
    setEntries(data.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  useEffect(() => {
    if (searchText) {
      const filtered = entries.filter(entry =>
        Object.values(entry.answers).some(answer =>
          answer?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  }, [searchText, entries]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderItem = ({ item }: { item: DiaryEntry }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.dateText}>{formatDate(item.date)}</Text>
      {Object.entries(item.answers).map(([key, value]) =>
        value ? (
          <View key={key} style={styles.answerContainer}>
            <Text style={styles.answerText}>{value}</Text>
          </View>
        ) : null
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="日記を検索..."
        placeholderTextColor={theme.colors.secondary}
      />
      <FlatList
        data={filteredEntries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchInput: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.text,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    borderRadius: 10,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  entryContainer: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 10,
    marginBottom: theme.spacing.md,
  },
  dateText: {
    color: theme.colors.secondary,
    fontSize: 16,
    marginBottom: theme.spacing.sm,
  },
  answerContainer: {
    marginTop: theme.spacing.sm,
  },
  answerText: {
    color: theme.colors.text,
    fontSize: 16,
  },
});
