import { Button, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animation4 from '../assets/images/Animation4.json';
import CustomText from './CustomText';
import ErrorMessageFront from './ErrorMessageHandling';
import useAuth from './hook/useAuth';
import { setMessage } from './reducer/messageReducer';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageLog, setErrorMessageLogging] = useState('');
    const errorMessage = useSelector(state => state.message.errorMessage);

    const dispatch = useDispatch();
    const { loginWithEmailAndPassword, setCurrentUser } = useAuth();
    const theme = useTheme();


    const handleEmailLogin = async () => {
        try {
            const user = await loginWithEmailAndPassword(email, password);
            // Dispache uma ação para atualizar o estado do usuário atual
            setCurrentUser(user);
            navigation.navigate('HomeScreen');

        } catch (error) {
            dispatch(setMessage({ category: 'errorMessage', message: 'Tentativa de login falhou. Por favor, verifique suas credenciais e tente novamente.' }));
            console.log(error);
        }
    };


    const handleRegisterNavigation = () => {
        navigation.navigate('RegisterScreen');
    };
    useEffect(() => {
        if (errorMessageLog) {
            dispatch(setMessage({ category: 'errorMessage', message: errorMessageLog }));
            setErrorMessageLogging(''); // Limpa a mensagem de erro logada
        }
    }, [errorMessageLog]);

    return (


        <Layout style={{ flex: 1 }}>
            <ErrorMessageFront message={errorMessage} duration={30000} />
            <View style={{ alignItems: 'center', marginTop: 0, marginBottom: 0, width: '100%' }}>
                <LottieView source={Animation4} autoPlay loop style={{ width: '100%', height: 300 }} />
            </View>
            <View style={{ paddingHorizontal: 30, width: '100%', marginTop: 0, marginBottom: 0 }}>
                <Text category='h1' >Welcome Back</Text>
                <CustomText category="s2WithPadding" style={{ width: '100%' }} >First the todos and next funny moments!</CustomText>


                <Input
                    placeholder='Type your email... '
                    value={email}
                    onChangeText={setEmail}
                    textStyle={{ color: 'white', fontSize: 14 }} // Estilo para o texto do placeholder
                    style={{ marginVertical: 5, width: '100%', paddingTop: 5 }}
                    require
                />



                <Input
                    placeholder='Type your secret password buddy...'
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    textStyle={{ color: 'white', fontSize: 14 }} // Estilo para o texto do placeholder
                    style={{ marginVertical: 5, width: '100%', paddingTop: 5, paddingBottom: 10 }}
                    require
                />

                <Button size='medium' onPress={handleEmailLogin} style={{ backgroundColor: theme['color-primary-600'], width: '100%', justifyContent: 'flex-start' }}>

                    <Text>Login</Text>
                </Button>

                <Button size='medium' onPress={handleRegisterNavigation} style={{ backgroundColor: theme['color-register-200'], width: '100%', borderWidth: 0, marginVertical: 10, justifyContent: 'flex-start' }}>Register</Button>


                <CustomText category="s2WithoutPadding">Or continue with</CustomText>
                <Button size='medium' appearance='outline' status='basic' style={{ width: '100%', marginTop: 20 }}>Login com Google</Button>

            </View>

        </Layout >
    );
};

export default LoginScreen;
