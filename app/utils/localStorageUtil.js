import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting storage item:', error);
    }
};

export const getStorageItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error getting storage item:', error);
        return null;
    }
};

export const removeStorageItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing storage item:', error);
    }
};