import React from 'react';
import {View, TouchableOpacity, Text, Modal} from 'react-native';

import CustomText from '../CustomText';

import styles from './CustomModal.style';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  renderHeaderButton?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  renderHeaderButton,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            {renderHeaderButton}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              testID="closeButton">
              <CustomText style={styles.closeButtonText}>X</CustomText>
            </TouchableOpacity>
          </View>
          <CustomText style={styles.titleText}>{title}</CustomText>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
