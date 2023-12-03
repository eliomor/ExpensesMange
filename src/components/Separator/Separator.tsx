import React from 'react';
import {View, StyleSheet} from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#BFBFBF',
    height: 1,
    width: 331,
    borderRadius: 1,
  },
});

export default Separator;
