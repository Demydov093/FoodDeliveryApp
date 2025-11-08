import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import StoreScreen from '../../screens/StoreScreen';
import { MainRoutes } from '../Routes';

import FontAwesome from '@react-native-vector-icons/fontawesome';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '1E88E5',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={MainRoutes.Home}
        component={HomeScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.Store}
        component={StoreScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="shopping-cart" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
