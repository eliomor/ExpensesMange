import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';

import {RootState} from '~/redux/store';
import {Expense} from '~/types/types';
import {removeExpense} from '~/redux/slices/userSlice';

export const applyFilters = (
  userState: RootState['user'],
  currentFilter: RootState['filters']['currentFilter'],
  setFilteredExpenses: React.Dispatch<
    React.SetStateAction<{[key: string]: Expense[]}>
  >,
) => {
  const filteredExpensesByDate = {};
  for (const [date, expenses] of Object.entries(userState.expenses)) {
    if (currentFilter) {
      filteredExpensesByDate[date] = expenses.filter(expense => {
        return (
          (!currentFilter.title ||
            expense.title.includes(currentFilter.title)) &&
          (!currentFilter.date || date === currentFilter.date)
        );
      });
    } else {
      filteredExpensesByDate[date] = expenses;
    }
  }
  setFilteredExpenses(filteredExpensesByDate);
};

export const handleDeleteExpense = async (
  expenseId: string,
  expenseDate: string,
  userState: RootState['user'],
  dispatch: Dispatch,
  fullName: string,
) => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    let users = userData ? JSON.parse(userData) : [];

    const updatedUsers = users.map(storedUser => {
      if (storedUser.fullName === fullName) {
        const updatedExpenses = {...storedUser.expenses};
        if (updatedExpenses[expenseDate]) {
          updatedExpenses[expenseDate] = updatedExpenses[expenseDate].filter(
            expense => expense.id !== expenseId,
          );
          if (updatedExpenses[expenseDate].length === 0) {
            delete updatedExpenses[expenseDate];
          }
        }
        return {...storedUser, expenses: updatedExpenses};
      }
      return storedUser;
    });

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUsers));
    dispatch(removeExpense({id: expenseId, date: expenseDate}));
  } catch (error) {
    console.error('Error updating user data in AsyncStorage:', error);
  }
};

export const findDateForExpense = (
  expenseId: string,
  userState: RootState['user'],
) => {
  for (let date in userState.expenses) {
    if (userState.expenses[date].some(expense => expense.id === expenseId)) {
      return date;
    }
  }
  throw new Error(`No date found for expense with ID ${expenseId}`);
};
