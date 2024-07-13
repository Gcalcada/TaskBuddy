import { useNavigation } from '@react-navigation/native';
import {
    Drawer, DrawerItem,
    IndexPath, Layout, Text
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
                    onSelect={index => setSelectedIndex(index)} style={styles.menuButton2}>
                    <DrawerItem title='Manage Your Data' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Share us with your buddys' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Friends List' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Invite Buddys to your friends List' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Rate us on play store' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Report a Bug' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Logout' onPress={handleLogout} titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Delete all data' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Dev Informations' titleStyle={styles.drawerItemText} />
                </Drawer>
            );
        }
        return null; // Não renderizar o Drawer se não estiver aberto
    };
    return (
        <Layout style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
                    <Icon name='menu' size={50} color='#FFD700' />
                </TouchableOpacity>
                <Text style={styles.title}>TaskBuddy</Text>
                <View style={styles.profileCircle} />
            </View>
            {renderDrawer()}
            {!isDrawerOpen && (
                <>
                    <View style={styles.headerContainer2}>
                        <View style={styles.searchBarContainer}>
                            <Icon name='search' size={20} color='#000' style={styles.searchIcon} />
                            <TextInput
                                placeholder="Find your task here buddy !"
                                placeholderTextColor="#000"
                                style={styles.searchBar}
                            />
                        </View>

                    </View>
                    <View style={styles.headerContainer3}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.mainTitle}>Task List </Text>
                            <Text style={styles.subtitle}>Pick your priority task and let's smash all of them, buddy !</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer4}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonScrollContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>High</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Medium</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Low</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>In Progress</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </>
            )}
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
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
    },
    headerContainer2: {
        top: 10,
        paddingHorizontal: 5,
        justifyContent: 'flex-start',
    },
    headerContainer3: {
        top: 10,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    headerContainer4: {

        top: 25,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },

    menuButton2: {
        color: '#000000',
        width: '100%',
    },

    title: {
        paddingLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    profileCircle: {
        marginLeft: 'auto',
        width: 40,
        height: 40,
        borderRadius: 20, // Faz o View parecer um círculo
        backgroundColor: '#FFD700',
    },
    searchBar: {
        flex: 1,
        height: 45,
        borderRadius: 12,
        paddingLeft: 40, // Adjusted to create space for the icon
        margin: 16,
        backgroundColor: '#FFFFFF',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: 30,
        zIndex: 1,
    },
    mainTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    subtitle: {
        paddingTop: 10,
        fontSize: 14,
        color: '#FFFFFF',
    },
    buttonScrollContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 14,
        color: '#000000',
    },

});

export default HomeScreen;
