import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Questions: undefined;
  DiaryPreview: {
    answers: Record<string, string>;
  };
  DiaryList: undefined;
};

export type AppNavigationProp = NavigationProp<RootStackParamList>;
