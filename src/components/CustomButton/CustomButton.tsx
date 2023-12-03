import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import CustomText from '../CustomText';

import styles from './CustomButton.styles';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({title, ...props}) => {
  return (
    <TouchableOpacity style={[styles.button]} {...props}>
      <CustomText style={[styles.buttonText]}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;
