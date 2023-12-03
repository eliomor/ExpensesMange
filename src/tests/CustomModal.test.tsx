import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import CustomModal from '../components/CustomModal';

describe('CustomModal', () => {
  it('renders correctly with the provided props', () => {
    const isVisible = true;
    const onClose = jest.fn();
    const title = 'Modal Title';
    const renderHeaderButton = <Text>Header Button</Text>;

    const {getByText, getByTestId} = render(
      <CustomModal
        isVisible={isVisible}
        onClose={onClose}
        title={title}
        renderHeaderButton={renderHeaderButton}>
        <Text>Modal Content</Text>
      </CustomModal>,
    );

    const modalTitle = getByText(title);
    const headerButton = getByText('Header Button');
    const modalContent = getByText('Modal Content');

    expect(modalTitle).toBeTruthy();
    expect(headerButton).toBeTruthy();
    expect(modalContent).toBeTruthy();
  });

  it('calls onClose when the close button is pressed', () => {
    const isVisible = true;
    const onClose = jest.fn();
    const title = 'Modal Title';
    const renderHeaderButton = <Text>Header Button</Text>;

    const {getByTestId} = render(
      <CustomModal
        isVisible={isVisible}
        onClose={onClose}
        title={title}
        renderHeaderButton={renderHeaderButton}>
        <Text>Modal Content</Text>
      </CustomModal>,
    );

    const closeButton = getByTestId('closeButton');
    fireEvent.press(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
