// ExpenseItem.styles.ts
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    padding: 5,
  },
  expenseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginHorizontal: 20,
  },
  deleteButton: {
    color: '#000000',
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  amountContainer: {
    minWidth: 60,
  },
  expenseTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  expenseAmount: {
    fontSize: 18,
    textAlign: 'right',
  },
});

export default styles;
