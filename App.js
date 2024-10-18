import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoApp from './TodoApp';
import SignUp from './SignUp';
import Login from './Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
        <Stack.Screen name="TodoApp" options={{ headerShown: false }} component={TodoApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
