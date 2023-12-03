import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {UserData, Expense} from '~/types/types';

const initialState: UserData = {
  fullName: '',
  expenses: {},
  login: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      return {...state, ...action.payload};
    },
    addExpense: (state, action: PayloadAction<Expense & {date: string}>) => {
      const {date, ...expense} = action.payload;

      if (!state.expenses[date]) {
        state.expenses[date] = [];
      }

      state.expenses[date].push(expense);
    },
    removeExpense: (
      state,
      action: PayloadAction<{date: string; id: string}>,
    ) => {
      const {date, id} = action.payload;
      state.expenses[date] = state.expenses[date].filter(
        expense => expense.id !== id,
      );

      if (state.expenses[date].length === 0) {
        delete state.expenses[date];
      }
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        oldDate: string;
        newDate: string;
        updatedExpense: Expense;
      }>,
    ) => {
      const {oldDate, newDate, updatedExpense} = action.payload;
      if (state.expenses[oldDate]) {
        state.expenses[oldDate] = state.expenses[oldDate].filter(
          expense => expense.id !== updatedExpense.id,
        );
        if (state.expenses[oldDate].length === 0) {
          delete state.expenses[oldDate];
        }
      }
      if (!state.expenses[newDate]) {
        state.expenses[newDate] = [];
      }
      const expenseIndex = state.expenses[newDate].findIndex(
        expense => expense.id === updatedExpense.id,
      );

      if (expenseIndex !== -1) {
        state.expenses[newDate][expenseIndex] = updatedExpense;
      } else {
        state.expenses[newDate].push(updatedExpense);
      }
    },
    clearUser: () => initialState,
  },
});

export const {setUser, addExpense, clearUser, removeExpense, updateExpense} =
  userSlice.actions;
export default userSlice.reducer;
