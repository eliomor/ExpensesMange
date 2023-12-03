import {StyleSheet} from 'react-native';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6FB',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  button: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
});

export default headerStyles;
