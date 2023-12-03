import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    marginBottom: 20,
  },
  totalExpenses: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginHorizontal: 40,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginHorizontal: 40,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default styles;
