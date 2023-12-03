import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateExpense} from '~/redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {CustomButton, CustomInput, CustomModal, CustomText} from '~/components';
import {RootState} from '~/redux/store';
import {Expense, UserData} from '~/types/types';

import styles from './EditExpenseModal.style';

interface EditExpenseModalProps {
  isVisible: boolean;
  onClose: () => void;
  expenseToEdit: Expense;
  dateOfExpense: string;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  isVisible,
  onClose,
  expenseToEdit,
  dateOfExpense,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [title, setTitle] = useState(expenseToEdit.title || '');
  const [amount, setAmount] = useState(expenseToEdit.amount.toString() || '');
  const [date, setDate] = useState(dateOfExpense || '');
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title || '');
      setAmount(expenseToEdit.amount.toString() || '');
      setDate(dateOfExpense || '');
    }
  }, [expenseToEdit, dateOfExpense]);

  const handleUpdateExpense = async () => {
    setAmountError('');
    setDateError('');

    if (!title || !amount || !date) {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }

    if (isNaN(parseFloat(amount))) {
      setAmountError('Amount must be a number');
      return;
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;
    if (!datePattern.test(date)) {
      setDateError('Date must be in the format dd/mm/yy');
      return;
    }

    const updatedExpense: Expense = {
      id: expenseToEdit ? expenseToEdit.id : '',
      title,
      amount: parseFloat(amount),
    };

    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const users = userDataString ? JSON.parse(userDataString) : [];

      const updatedUsers = users.map((storedUser: UserData) => {
        if (storedUser.fullName === user.fullName) {
          const updatedExpenses = {...storedUser.expenses};

          if (dateOfExpense in updatedExpenses) {
            updatedExpenses[dateOfExpense] = updatedExpenses[
              dateOfExpense
            ].filter((exp: Expense) => exp.id !== updatedExpense.id);
            if (updatedExpenses[dateOfExpense].length === 0) {
              delete updatedExpenses[dateOfExpense];
            }
          }
          if (date in updatedExpenses) {
            updatedExpenses[date].push(updatedExpense);
          } else {
            updatedExpenses[date] = [updatedExpense];
          }

          return {...storedUser, expenses: updatedExpenses};
        }
        return storedUser;
      });

      await AsyncStorage.setItem('userData', JSON.stringify(updatedUsers));
      dispatch(
        updateExpense({
          oldDate: dateOfExpense,
          newDate: date,
          updatedExpense,
        }),
      );
      onClose();
    } catch (error) {
      console.error('Error updating user data in AsyncStorage:', error);
      Alert.alert('Update Failed', 'There was an error updating the expense');
    }
  };

  return (
    <CustomModal isVisible={isVisible} onClose={onClose} title="Edit Expense">
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Title"
          value={title ? title : ''}
          onChangeText={setTitle}
        />
        <CustomInput
          placeholder="Amount"
          value={amount ? amount : ''}
          keyboardType="numeric"
          onChangeText={setAmount}
        />
        {amountError ? (
          <CustomText style={styles.errorText}>{amountError}</CustomText>
        ) : null}
        <CustomInput
          placeholder="Date (dd/mm/yy)"
          value={date}
          onChangeText={setDate}
        />
        {dateError ? (
          <CustomText style={styles.errorText}>{dateError}</CustomText>
        ) : null}
      </View>
      <View style={styles.saveButton}>
        <CustomButton onPress={handleUpdateExpense} title="Update Expense" />
      </View>
    </CustomModal>
  );
};

export default EditExpenseModal;
