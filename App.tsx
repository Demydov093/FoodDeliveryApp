import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigationRef,
  setIsNavigationReady,
} from './src/navigation/Navigation';
import RootNavigator from './src/navigation/navigators/RootNavigator';

import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef} onReady={setIsNavigationReady}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
