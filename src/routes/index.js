import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import NavigationService from './NavigationService';
import NavigationStack from './NavigationStack';

const AppNavigator = () => (
  <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
    <NavigationStack />
  </NavigationContainer>
);

export default AppNavigator;
