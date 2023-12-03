import {StackNavigationProp} from '@react-navigation/stack';

export interface UserData {
  fullName: string;
  expenses: {[key: string]: Expense[]};
  login: boolean;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
}
export interface Filter {
  title: string;
  date: string;
}

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Profile: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;
