import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: '70%',
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
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
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
