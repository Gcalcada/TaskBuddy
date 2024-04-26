import { Button, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import useAuth from './hook/useAuth';
import { setMessage } from './reducer/messageReducer';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();


            navigation.navigate('LoginScreen');
        } catch (error) {
            dispatch(setMessage({ category: 'errorMessage', message: 'Erro ao fazer logout. Por favor, tente novamente.' }));
            console.error('Erro ao fazer logout:', error);
        }
    };


    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', marginTop: 0, marginBottom: 0, width: '100%' }}>
                <Text category='h1'>Bem-vindo à Home</Text>
                <Button onPress={handleLogout} style={{ marginVertical: 20 }}>Logout</Button>
            </View>
        </Layout>
    );
};

export default HomeScreen;