import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {addExpense} from '~/redux/slices/userSlice';
import {RootState} from '~/redux/store';
import {CustomButton, CustomInput, CustomModal, CustomText} from '~/components';

import styles from './AddExpenseModal.styles';

interface ExpenseModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddExpenseModal: React.FC<ExpenseModalProps> = ({isVisible, onClose}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  const user = useSelector((state: RootState) => state.user);

  const handleSaveExpense = async () => {
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

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
    };

    try {
      const userData = await AsyncStorage.getItem('userData');
      let users = userData ? JSON.parse(userData) : [];

      const updatedUsers = users.map(storedUser => {
        if (storedUser.fullName === user.fullName) {
          const updatedExpenses = {
            ...storedUser.expenses,
            [date]: storedUser.expenses[date]
              ? [...storedUser.expenses[date], newExpense]
              : [newExpense],
          };

          return {...storedUser, expenses: updatedExpenses};
        }
        return storedUser;
      });

      await AsyncStorage.setItem('userData', JSON.stringify(updatedUsers));

      dispatch(addExpense({...newExpense, date}));
      onClose();
      setTitle('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error updating user data in AsyncStorage:', error);
    }
  };

  return (
    <CustomModal isVisible={isVisible} onClose={onClose} title="Create Expense">
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <CustomInput
          placeholder="Amount"
          value={amount}
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
        <CustomButton onPress={handleSaveExpense} title="Save Expense" />
      </View>
    </CustomModal>
  );
};

export default AddExpenseModal;
