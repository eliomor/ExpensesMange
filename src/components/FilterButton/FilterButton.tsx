import React from 'react';
import {TouchableOpacity} from 'react-native';

import {SvgImage, CustomText} from '~/components';
import {filterSliders} from '~/assets/icons';

import styles from './FilterButton.style';

interface FilterButtonProps {
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress}>
      <SvgImage xml={filterSliders} width={20} height={20} />
      <CustomText style={styles.filterButtonText}>Filter</CustomText>
    </TouchableOpacity>
  );
};

export default FilterButton;
