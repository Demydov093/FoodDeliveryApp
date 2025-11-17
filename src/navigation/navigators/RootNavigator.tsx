import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRoutes } from '../Routes';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { authStore } from '../../store/userStore';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = authStore();
  const [isLoading, setIsLoading] = useState(true);

  authStore.persist.onFinishHydration(() => {
    console.log('Auth state rehydrated', { isAuthenticated, token });
    setIsLoading(false);
  });

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
