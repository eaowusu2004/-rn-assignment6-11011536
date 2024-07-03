import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';


// Screens
import ProductsScreen from "./Pages/productsScreen"
import Checkout from "./Pages/checkoutScreen";


const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <>
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="Products"
          component={ProductsScreen}
          
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Checkout"
          component={Checkout}
        />
      </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;