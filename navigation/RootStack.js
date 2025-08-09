import React from 'react'
import GameScreen from '../screens/GameScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomSplashScreen from '../screens/CustomSplashScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen 
                name="Splash" 
                component={CustomSplashScreen} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name="Game" 
                component={GameScreen} 
                options={{headerShown: false}} 
            />
        </Stack.Navigator>
    );
}

export default RootStack;