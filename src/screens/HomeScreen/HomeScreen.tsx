import React, {useEffect, useState} from 'react';
import {View, SectionList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '~/redux/store';
import {Expense} from '~/types/types';
import {
  Header,
  ExpenseItem,
  FilterButton,
  FilterModal,
  EditExpenseModal,
  CustomText,
} from '~/components';
import {clearFilter} from '~/redux/slices/filterSlice';
import {
  applyFilters,
  handleDeleteExpense,
  findDateForExpense,
} from '~/utils/logic';

import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const currentFilter = useSelector(
    (state: RootState) => state.filters.currentFilter,
  );

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState<{
    [key: string]: Expense[];
  }>({});
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editExpenseDetails, setEditExpenseDetails] = useState<{
    expense: Expense;
    date: string;
  }>({expense: {title: '', amount: 0, id: ''}, date: ''});

  useEffect(() => {
    applyFilters(userState, currentFilter, setFilteredExpenses);
  }, [userState.expenses, currentFilter]);

  const handleDelete = async (expenseId, expenseDate) => {
    handleDeleteExpense(
      expenseId,
      expenseDate,
      userState,
      dispatch,
      userState.fullName,
    );
  };

  const findDate = expenseId => {
    return findDateForExpense(expenseId, userState);
  };

  const handleEditExpense = (expense: Expense, date: string) => {
    setEditExpenseDetails({expense, date});
    setEditModalVisible(true);
  };

  const prepareSections = () => {
    const sortedDates = Object.keys(filteredExpenses).sort((a, b) =>
      b.localeCompare(a),
    );

    type Section = {
      title: string;
      data: Expense[];
    };

    const initialSections: Section[] = [];

    const sections = sortedDates.reduce((acc: Section[], date) => {
      if (filteredExpenses[date].length > 0) {
        acc.push({
          title: date,
          data: filteredExpenses[date],
        });
      }
      return acc;
    }, initialSections);

    return sections;
  };

  const totalExpense = Object.values(filteredExpenses).reduce(
    (totalSum, expenses) => {
      return (
        totalSum + expenses.reduce((sum, expense) => sum + expense.amount, 0)
      );
    },
    0,
  );
  const sections = prepareSections();

  return (
    <View style={styles.container}>
      <Header title={userState.fullName.split(' ')[0]} />
      <CustomText style={styles.totalExpense}>
        Total Expense: ${totalExpense}
      </CustomText>
      <FilterButton onPress={() => setFilterModalVisible(true)} />
      {currentFilter && (
        <View style={styles.filterDisplay}>
          <CustomText>
            Filter: {currentFilter.title} {currentFilter.date}
          </CustomText>
          <TouchableOpacity onPress={() => dispatch(clearFilter())}>
            <CustomText style={styles.clearFilter}>X</CustomText>
          </TouchableOpacity>
        </View>
      )}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}) => (
          <ExpenseItem
            item={item}
            onDelete={() => handleDelete(item.id, findDate(item.id))}
            onEdit={() => handleEditExpense(item, findDate(item.id))}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.dateStrip}>
            <CustomText style={styles.dateText}>{title}</CustomText>
          </View>
        )}
        style={{width: '100%'}}
      />
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
      <EditExpenseModal
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        expenseToEdit={editExpenseDetails.expense}
        dateOfExpense={editExpenseDetails.date}
      />
    </View>
  );
};

export default HomeScreen;
