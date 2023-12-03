import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  saveButton: {
    padding: 25,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
