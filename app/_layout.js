import * as eva from '@eva-design/eva';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { default as mapping } from '../mapping.json';
import { default as theme } from '../theme.json';
import HomeScreen from './HomeScreen'; // Importe a HomeScreen
import LoginScreen from './LoginScreen';
import OnboardingScreen from './OnboardingScreen';
import RegisterScreen from './RegisterScreen';
import store from './redux/store';
const Stack = createStackNavigator();

const _layout = () => {

    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <Stack.Navigator>
            {/* Se currentUser existir, redirecione para a HomeScreen */}
            {currentUser ? (
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen
                        initialRouteName="OnboardingScreen"
                        name="OnboardingScreen"
                        component={OnboardingScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

const App = () => (
    <Provider store={store}>
        <ApplicationProvider
            {...eva}
            theme={{ ...eva.dark, ...theme }}
            customMapping={{ ...eva.mapping, ...mapping }}
        >
            <_layout />
        </ApplicationProvider>
    </Provider>
);

export default App;