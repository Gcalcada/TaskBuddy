import * as eva from '@eva-design/eva';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { useEffect, useState } from 'react'; // Import useState
import { Provider } from 'react-redux';
import { default as mapping } from '../mapping.json';
import { default as theme } from '../theme.json';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import OnboardingScreen from './OnboardingScreen';
import RegisterScreen from './RegisterScreen';
import useAuth from './hook/useAuth';
import store from './redux/store';
const Stack = createStackNavigator();


const _layout = () => {
    const { checkAuthStatus } = useAuth();
    const [initialRouteName, setInitialRouteName] = useState(null);

    useEffect(() => {
        const determineInitialRoute = async () => {
            try {
                const isLoggedIn = await checkAuthStatus();
                setInitialRouteName(isLoggedIn ? 'HomeScreen' : 'OnboardingScreen');
            } catch (error) {
                console.error('Error determining initial route:', error);
                // Handle error here, such as setting a default route or displaying an error message
            }
        };

        determineInitialRoute();
    }, [checkAuthStatus]);

    if (initialRouteName === null) {
        return null; // Render nothing until initial route is determined
    }

    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
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