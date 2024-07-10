import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import useAuth from './hook/useAuth'; // Importe o hook useAuth

const RegisterScreen = ({ navigation }) => {
    const { RegWithEmailAndPassword } = useAuth(); // Use o hook useAuth para acessar a função registerWithEmailAndPassword
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setFullName] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        try {

            const user = await RegWithEmailAndPassword(email, password, userId);
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            setErrorMessage('Ocorreu um erro ao fazer o registro. Por favor, tente novamente.');
        }
    };

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text category='h1'>Register</Text>
                    {photoURL && <Image source={{ uri: photoURL }} style={{ width: 200, height: 200 }} />}
                    <Input
                        placeholder='Nome Completo'
                        value={userId}
                        onChangeText={setFullName}
                        style={{ marginVertical: 10, width: '100%' }}
                    />
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
                    {/* Componente de seleção de foto (ImagePicker) */}
                    <Button onPress={handleSignUp} style={{ marginVertical: 10, width: '100%' }}>
                        <Text>Sign Up</Text>
                    </Button>
                    {errorMessage ? <Text>{errorMessage}</Text> : null}
                </View>
            </ScrollView>
        </Layout>
    );
};

export default RegisterScreen;
