// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/LoginScreen ';
import Dashboard from './Screen/Dashboard';
import Test from './Screen/Test';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Stack.Screen name="dashboard" component={Dashboard}  options={{ headerShown: false }} />
        <Stack.Screen name="test" component={Test}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
