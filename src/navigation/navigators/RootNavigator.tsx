import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRoutes } from '../Routes';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = true;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name={RootRoutes.MainTabs} component={MainNavigator} />
      ) : (
        <Stack.Screen name={RootRoutes.AuthStack} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
