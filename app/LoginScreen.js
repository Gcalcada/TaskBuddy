import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from './CustomText';
import useAuth from './hook/useAuth'; // Import the useAuth hook
import { setCurrentUser } from './reducer/authReducer';
import { setMessage } from './reducer/messageReducer';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(state => state.message.errorMessage);

    const dispatch = useDispatch();
    const { loginWithEmailAndPassword } = useAuth();

    const handleEmailLogin = async () => {
        try {
            const user = await loginWithEmailAndPassword(email, password);
            dispatch(setCurrentUser(user));
            navigation.navigate('Home');
        } catch (error) {
            // Set error message in Redux state
            dispatch(setMessage({ category: 'errorMessage', message: 'Tentativa de login falhou. Por favor, verifique suas credenciais e tente novamente.' }));
            console.log(error);
        }
    };
    const handleRegisterNavigation = () => {
        navigation.navigate('RegisterScreen'); // Change 'Register' to the name of your register screen
    };
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text category='h1'>Login</Text>

                    <Input
                        placeholder='E-mail'
                        value={email}
                        onChangeText={setEmail}
                        style={{ marginVertical: 10, width: '100%' }}
                        require
                    />
                    <Input
                        placeholder='Senha'
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        style={{ marginVertical: 10, width: '100%' }}
                        require
                    />
                    <Button onPress={handleEmailLogin} style={{ marginVertical: 10, width: '100%' }}>Login</Button>
                    <Button appearance='outline' status='danger' style={{ width: '100%' }}>Login com Google</Button>
                    <Button onPress={handleRegisterNavigation} appearance='outline' status='basic' style={{ marginVertical: 10, width: '100%' }}>Registrar</Button>
                    {errorMessage ? <CustomText category="s2WithPadding">{errorMessage}</CustomText> : null}
                </View>
            </ScrollView>
        </Layout>
    );
};

export default LoginScreen;