import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

const CustomText: React.FC<TextProps> = ({children, style, ...props}) => {
  return (
    <Text style={[styles.defaultStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'ABeeZee-Regular',
  },
});

export default CustomText;
