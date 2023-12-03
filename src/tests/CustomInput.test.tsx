import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomInput from '../components/CustomInput';

describe('CustomInput', () => {
  it('renders correctly with the provided props', () => {
    const placeholder = 'Enter text';
    const value = 'Hello, World!';
    const onChangeText = jest.fn();

    const {getByPlaceholderText, getByDisplayValue} = render(
      <CustomInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        textInputProps={
          {
            // Add any additional props you want to test here
          }
        }
      />,
    );

    const input = getByPlaceholderText(placeholder);
    const displayValue = getByDisplayValue(value);

    expect(input).toBeTruthy();
    expect(displayValue).toBeTruthy();
  });

  it('calls onChangeText when the input value changes', () => {
    const placeholder = 'Enter text';
    const onChangeText = jest.fn();

    const {getByPlaceholderText} = render(
      <CustomInput
        placeholder={placeholder}
        value=""
        onChangeText={onChangeText}
      />,
    );

    const input = getByPlaceholderText(placeholder);

    fireEvent.changeText(input, 'New text');

    expect(onChangeText).toHaveBeenCalledWith('New text');
  });
});
