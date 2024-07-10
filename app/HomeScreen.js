import { useNavigation } from '@react-navigation/native';
import {
    Drawer, DrawerItem,
    IndexPath, Layout, Text
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import useAuth from './hook/useAuth';
import { setMessage } from './reducer/messageReducer';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { logout } = useAuth();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('LoginScreen');
        } catch (error) {
            dispatch(setMessage({ category: 'errorMessage', message: 'Erro ao fazer logout. Por favor, tente novamente.' }));
            console.error('Erro ao fazer logout:', error);
        }
    };

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // Alternar o estado do Drawer
    };

    const renderDrawer = () => {
        if (isDrawerOpen) {
            return (
                <Drawer
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}>
                    <DrawerItem title='Manage Your Data' />
                    <DrawerItem title='Share us with your buddys' />
                    <DrawerItem title='Friends List' />
                    <DrawerItem title='Invite Buddys to your friends List' />
                    <DrawerItem title='Rate us on play store' />
                    <DrawerItem title='Report a Bug' />
                    <DrawerItem title='Logout' onPress={handleLogout} />
                    <DrawerItem title='Delete all data' />
                    <DrawerItem title='Dev Informations' />
                </Drawer>
            );
        }
        return null; // Não renderizar o Drawer se não estiver aberto
    };

    return (
        <Layout style={{ flex: 1 }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Icon name='menu' size={50} color='#FFD700' />
            </TouchableOpacity>
            {renderDrawer()}
        </Layout>
    );
};

const DrawerHeader = () => (
    <View style={styles.header}>
        <Text category='h1'>John Kevin</Text>
        <Text category='s1'>Email: John@kevin.com</Text>
        <Text category='s1'>Play Type : Free</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20, // Espaçamento do topo
        marginLeft: 20, // Padding do lado esquerdo
    },
});

export default HomeScreen;
