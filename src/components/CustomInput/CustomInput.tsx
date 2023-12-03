import React from 'react';
import {TextInput, View, TextInputProps} from 'react-native';

import {styles} from './CustomInput.styles';

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  textInputProps?: TextInputProps;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        textAlign={'left'}
        {...textInputProps}
      />
    </View>
  );
};

export default CustomInput;
