import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigationRef,
  setIsNavigationReady,
} from './src/navigation/Navigation';
import RootNavigator from './src/navigation/navigators/RootNavigator';

import './global.css';

function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={setIsNavigationReady}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
