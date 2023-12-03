import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {setFilter, clearFilter} from '~/redux/slices/filterSlice';
import {CustomButton, CustomInput, CustomModal, CustomText} from '~/components';

import styles from './FilterModal.styles';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({isVisible, onClose}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');

  const handleApplyFilter = () => {
    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;
    if (date && !datePattern.test(date)) {
      setDateError('Date must be in the format dd/mm/yy');
      return;
    }

    dispatch(setFilter({title, date}));
    onClose();
  };

  const handleReset = () => {
    setTitle('');
    setDate('');
    setDateError('');
    dispatch(clearFilter());
  };

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      title="Filters"
      renderHeaderButton={
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <CustomText style={styles.resetButtonText}>Clear</CustomText>
        </TouchableOpacity>
      }>
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <CustomInput
          placeholder="Date (dd/mm/yy)"
          value={date}
          onChangeText={setDate}
        />
        {dateError ? (
          <CustomText style={styles.errorText}>{dateError}</CustomText>
        ) : null}
      </View>
      <View style={styles.saveButton}>
        <CustomButton onPress={handleApplyFilter} title="Apply" />
      </View>
    </CustomModal>
  );
};

export default FilterModal;
