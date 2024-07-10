import { Button, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animation4 from '../assets/images/Animation4.json';
import CustomText from './CustomText';
import ErrorMessageFront from './ErrorMessageHandling';
import useAuth from './hook/useAuth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageKey, setErrorMessageKey] = useState(0); // Key to force re-render
    const [errorMessage, setErrorMessage] = useState('');
    const { loginWithEmailAndPassword, loginWithGoogle } = useAuth();
    const theme = useTheme();

    const handleEmailLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill in all fields');
            setErrorMessageKey(prevKey => prevKey + 1); // Update key to force re-render
            return;
        }

        await loginWithEmailAndPassword(email, password);
        navigation.navigate('HomeScreen');

    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Google login error:', error);
            // Handle Google login error here
        }
    };

    const handleRegisterNavigation = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <Layout style={{ flex: 1 }}>
            <ErrorMessageFront key={errorMessageKey} message={errorMessage} duration={30000} />
            <View style={{ alignItems: 'center', marginTop: 0, marginBottom: 0, width: '100%' }}>
                <LottieView source={Animation4} autoPlay loop style={{ width: '100%', height: 300 }} />
            </View>
            <View style={{ paddingHorizontal: 30, width: '100%', marginTop: 0, marginBottom: 0 }}>
                <Text category='h1' >Welcome Back</Text>
                <CustomText category="s2WithPadding" style={{ width: '100%' }} >First the todos and next funny moments!</CustomText>

                <Input
                    placeholder='Type your email...'
                    value={email}
                    onChangeText={setEmail}
                    textStyle={{ color: 'white', fontSize: 14 }}
                    style={{ marginVertical: 5, width: '100%', paddingTop: 5 }}
                />

                <Input
                    placeholder='Type your secret password buddy...'
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    textStyle={{ color: 'white', fontSize: 14 }}
                    style={{ marginVertical: 5, width: '100%', paddingTop: 5, paddingBottom: 10 }}
                />

                <Button size='medium' onPress={handleEmailLogin} style={{ backgroundColor: theme['color-primary-600'], width: '100%', justifyContent: 'flex-start' }}>
                    <Text>Login</Text>
                </Button>

                <Button size='medium' onPress={handleRegisterNavigation} style={{ backgroundColor: theme['color-register-200'], width: '100%', borderWidth: 0, marginVertical: 10, justifyContent: 'flex-start' }}>
                    Register
                </Button>

                <CustomText category="s2WithoutPadding">Or continue with</CustomText>
                <Button size='medium' onPress={handleGoogleLogin} appearance='outline' status='basic' style={{ width: '100%', marginTop: 20 }}>
                    Login com Google
                </Button>
            </View>
        </Layout>
    );
};

export default LoginScreen;
