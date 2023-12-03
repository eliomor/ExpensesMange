import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setUser} from '~/redux/slices/userSlice';
import {CustomButton} from '~/components';
import {RootStackNavigationProp} from '~/types/types';

import styles from './LoginScreen.styles';

const LoginScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const fullNameInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const checkUserData = async () => {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const users = JSON.parse(storedData);
        const loggedInUser = users.find(user => user.login);
        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
          navigation.navigate('Main');
        }
      }
    };

    checkUserData();
    if (fullNameInputRef.current) {
      fullNameInputRef.current.focus();
    }
  }, [dispatch, navigation]);

  const handleSubmit = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    let users = storedData ? JSON.parse(storedData) : [];

    let user = users.find(user => user.fullName === fullName);
    if (!user) {
      user = {fullName, expenses: [], login: true};
      users.push(user);
    } else {
      user.login = true;
    }

    await AsyncStorage.setItem('userData', JSON.stringify(users));

    dispatch(setUser(user));

    navigation.navigate('Main');

    setFullName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={fullNameInputRef}
        style={styles.input}
        placeholder="Enter Name"
        value={fullName}
        onChangeText={setFullName}
        textAlign="left"
      />
      <CustomButton title="Login" onPress={handleSubmit} />
    </View>
  );
};

export default LoginScreen;
