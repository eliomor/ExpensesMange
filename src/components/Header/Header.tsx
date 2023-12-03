import React, {FC} from 'react';
import {View} from 'react-native';

import CustomText from '../CustomText';

import headerStyles from './Header.style';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({title}) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.titleContainer}>
        <CustomText style={headerStyles.titleText}>{title}</CustomText>
      </View>
    </View>
  );
};

export default Header;
