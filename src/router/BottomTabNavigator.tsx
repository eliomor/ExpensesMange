import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '~/screens/HomeScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import {AddExpenseModal, CustomText} from '~/components';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 60, paddingBottom: 15},
          tabBarLabelStyle: {fontSize: 18},
          tabBarIcon: () => null,
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <CustomText style={styles.addButtonText}>+</CustomText>
      </TouchableOpacity>

      <AddExpenseModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#455EFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addButtonText: {
    fontSize: 25,
    color: 'white',
  },
});

export default BottomTabNavigator;
