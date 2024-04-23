import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from './hook/useAuth'; // Importe o hook useAuth
import { setCurrentUser } from './reducer/authReducer';
import { setMessage } from './reducer/messageReducer';

const HomeScreen = ({ navigation }) => {
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const { logout } = useAuth();

    useEffect(() => {
        // Verifica se o usuário está autenticado
        if (!currentUser) {
            navigation.navigate('LoginScreen'); // Redireciona para a página de login se o usuário não estiver autenticado
        }
    }, [currentUser, navigation]);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(setCurrentUser(null)); // Define o usuário como nulo no estado Redux
            dispatch(setMessage({ category: 'successMessage', message: 'Logout realizado com sucesso.' }));
            navigation.navigate('LoginScreen'); // Redireciona para a página de login após logout
        } catch (error) {
            dispatch(setMessage({ category: 'errorMessage', message: 'Erro ao fazer logout. Por favor, tente novamente.' }));
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Bem-vindo à Home</Text>
            <Button onPress={handleLogout} style={{ marginVertical: 20 }}>Logout</Button>
        </Layout>
    );
};

export default HomeScreen;