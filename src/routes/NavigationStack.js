import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PatientFormScreen} from '../pages/PatientForm';

const Stack = createNativeStackNavigator();

const createStack = (StackType, stack, props) => (
  <StackType.Navigator screenOptions={{headerShown: false}} {...props}>
    {Object.keys(stack).map(screen => (
      <StackType.Screen
        key={screen}
        name={screen}
        component={stack[screen].component}
      />
    ))}
  </StackType.Navigator>
);

const appStack = {
  PatientForm: {component: PatientFormScreen},
};

const NavigationStack = () => createStack(Stack, appStack);

export default NavigationStack;
