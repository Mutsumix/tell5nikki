import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiaryEntry } from "../types/diary";

const DIARY_STORAGE_KEY = "@diary_entries";

export const storageUtils = {
  async saveDiaryEntry(entry: DiaryEntry): Promise<void> {
    try {
      const existingData = await this.getAllEntries();
      const newData = [...existingData, entry];
      await AsyncStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.error("Error saving diary entry:", error);
      throw error;
    }
  },

  async getAllEntries(): Promise<DiaryEntry[]> {
    try {
      const data = await AsyncStorage.getItem(DIARY_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting diary entries:", error);
      return [];
    }
  },

  async searchEntries(searchText: string): Promise<DiaryEntry[]> {
    try {
      const entries = await this.getAllEntries();
      return entries.filter((entry) =>
        Object.values(entry.answers).some((answer) =>
          answer?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Error searching diary entries:", error);
      return [];
    }
  },
};
