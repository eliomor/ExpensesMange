import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootState} from '~/redux/store';
import {Header, Separator, CustomText} from '~/components';
import {clearUser} from '~/redux/slices/userSlice';
import {RootStackNavigationProp} from '~/types/types';

import styles from './ProfileScreen.styles';

const ProfileScreen: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    if (storedData) {
      let users = JSON.parse(storedData);

      const loggedInUserIndex = users.findIndex(user => user.login);
      if (loggedInUserIndex !== -1) {
        users[loggedInUserIndex].login = false;
      }

      await AsyncStorage.setItem('userData', JSON.stringify(users));

      dispatch(clearUser());

      navigation.navigate('Login');
    }
  };

  const totalExpenses = Object.values(userData.expenses).reduce(
    (total, expenses) => total + expenses.length,
    0,
  );

  return (
    <View style={styles.mainContainer}>
      {userData && (
        <>
          <Header title={userData.fullName} />
          <View style={styles.container}>
            <CustomText style={styles.totalExpenses}>
              Total Expenses Items {totalExpenses}
            </CustomText>
            <Separator />
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <CustomText style={styles.logoutButtonText}>Sign out</CustomText>
            </TouchableOpacity>
            <Separator />
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
