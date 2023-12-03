import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Expense} from '~/types/types';

import CustomText from '../CustomText';

import styles from './ExpenseItem.styles';

interface ExpenseItemProps {
  item: Expense;
  onDelete: () => void;
  onEdit: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({item, onDelete, onEdit}) => (
  <TouchableOpacity style={styles.container} onPress={onEdit}>
    <View style={styles.expenseDetails}>
      <TouchableOpacity onPress={onDelete}>
        <CustomText style={styles.deleteButton}>X</CustomText>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <CustomText style={styles.expenseTitle}>{item.title}</CustomText>
      </View>
      <View style={styles.amountContainer}>
        <CustomText style={styles.expenseAmount}>${item.amount}</CustomText>
      </View>
    </View>
  </TouchableOpacity>
);

export default ExpenseItem;
