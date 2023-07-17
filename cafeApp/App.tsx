import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './src/CategoriesScreen';
import ProductScreen from './src/ProductScreen';
import ProductDetail from './src/ProductDetail';
import CartScreen from './src/CartScreen';
import OrderScreen from './src/OrderScreen';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Categories' component={CategoriesScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name='Product' component={ProductScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name='ProductDetail' component={ProductDetail}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name='Cart' component={CartScreen} />
        <Stack.Screen name='Order' component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;