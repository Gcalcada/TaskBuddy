import * as eva from '@eva-design/eva';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import { default as mapping } from '../mapping.json';
import { default as theme } from '../theme.json';
import OnboardingScreen from './OnboardingScreen';

const Stack = createStackNavigator();

export default () => (
    <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...theme }}
        customMapping={mapping}>
        <Stack.Navigator>
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </ApplicationProvider>
);