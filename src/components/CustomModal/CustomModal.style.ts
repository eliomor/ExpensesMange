import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: '70%',
    borderColor: 'black',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default styles;
