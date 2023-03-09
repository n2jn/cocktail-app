import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabNavigator} from '~navigation/TabNavigator';

export default () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);
