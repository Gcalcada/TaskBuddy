import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import {
    Drawer, DrawerItem,
    IndexPath, Layout, Text
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import useAuth from './hook/useAuth';
import { setMessage } from './reducer/messageReducer';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { logout, addTask, fetchTasks } = useAuth();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const { fetchUserTasks } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer
    const [isModalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const userTasks = await fetchTasks();
                setTasks(userTasks);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };

        loadTasks();
    }, []);



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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAddTask = async () => {
        try {
            await addTask(title, description, priority, startDate, endDate);
            console.log('Task added successfully');
            setTitle('');
            setDescription('');
            setPriority('Low');
            setStartDate(new Date());
            setEndDate(new Date());
            toggleModal();
        } catch (error) {
            console.error('Error adding task:', error);
            dispatch(setMessage({ category: 'errorMessage', message: 'Erro ao adicionar tarefa. Por favor, tente novamente.' }));
        }
    };

    const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(Platform.OS === 'android');
        setStartDate(currentDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(Platform.OS === 'android');
        setEndDate(currentDate);
    };

    const renderDrawer = () => {
        if (isDrawerOpen) {
            return (
                <Drawer
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)} style={styles.menuButton2}>
                    <DrawerItem title='Friends List' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Invite Buddys to your friends List' titleStyle={styles.drawerItemText} />
                    <DrawerItem title='Rate us on play store' titleStyle={styles.drawerItemText} />
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
                    <View style={styles.headerContainer5}>
                        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                            <Icon name='add' size={20} color='#000' style={styles.addIcon} />
                            <Text style={styles.addButtonText}>Add Task</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.taskList}>
                        {tasks.map((task) => (
                            <View key={task.id} style={styles.taskItem}>
                                <Text style={styles.taskTitle}>Title: {task.title}</Text>
                                <Text style={styles.taskDescription}>Description: {task.description}</Text>
                                <Text style={styles.taskPriority}>Priority: {task.priority}</Text>

                            </View>
                        ))}
                    </View>
                </>
            )}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Task</Text>
                    <TextInput
                        placeholder="Task Title"
                        placeholderTextColor="#FFFFFF"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.modalInput}
                    />
                    <TextInput
                        placeholder="Task Description"
                        placeholderTextColor="#FFFFFF"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.modalInput}
                    />
                    <Text style={styles.label}>Priority</Text>
                    <View style={styles.modalPickerContainer}>
                        <Picker
                            selectedValue={priority}
                            onValueChange={(itemValue) => setPriority(itemValue)}
                            style={styles.modalPicker}
                        >
                            <Picker.Item label="Low" value="Low" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="High" value="High" />
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
                        <Text style={styles.saveButtonText}>Save Task</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    headerContainer5: {
        top: 40,
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
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        borderRadius: 12,
        paddingLeft: 20,
        margin: 16,
        top: 280,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
    },
    addIcon: {
        paddingRight: 30,
    },
    addButtonText: {
        right: 25,
        fontSize: 16,
        color: '#000000',
    },
    modalContent: {
        backgroundColor: '#222B44',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    modalInput: {
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalPickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        color: '#FFFFFF',
    },
    modalPicker: {
        width: '100%',
        height: 50,
        color: '#FFFFFF',
    },
    datePickerText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        color: '#000',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default HomeScreen;
