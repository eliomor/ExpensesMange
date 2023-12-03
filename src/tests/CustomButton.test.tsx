import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CustomButton from '../components/CustomButton/CustomButton';

describe('CustomButton', () => {
  test('renders correctly with title', () => {
    const {getByText} = render(<CustomButton title="Click me" />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDefined();
  });

  test('calls onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton title="Click me" onPress={onPressMock} />,
    );
    const buttonElement = getByText('Click me');

    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalled();
  });
});
