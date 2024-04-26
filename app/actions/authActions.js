// authActions.js
import { CLEAR_CURRENT_USER } from '../types/types';
import { removeStorageItem } from '../utils/localStorageUtil';

export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // Add any other necessary fields here
    }
});

export const clearCurrentUser = () => {
    // Remove current user from localStorage
    removeStorageItem('currentUser');

    return {
        type: CLEAR_CURRENT_USER,
    };
};