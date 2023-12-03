import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  totalExpense: {
    fontSize: 18,
    padding: 10,
    alignSelf: 'flex-start',
  },
  expenseDateContainer: {
    padding: 10,
  },
  expenseDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    marginLeft: 260,
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'white',
  },
  dateStrip: {
    backgroundColor: '#F4EEEE',
    paddingVertical: 3,
  },
  dateText: {
    color: '#000000',
    marginLeft: 20,
  },
  filterDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  clearFilter: {
    marginLeft: 8,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default styles;
