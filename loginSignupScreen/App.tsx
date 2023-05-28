import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './src/pages/WelcomePage';
import LoginPage from './src/pages/LoginPage';
import SignupPage from './src/pages/SignupPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='WelcomePage'
          component={WelcomePage}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='LoginPage'
          component={LoginPage}
          options={{ headerTitle: "" }} />
        <Stack.Screen
          name='SignupPage'
          component={SignupPage}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;