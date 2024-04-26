import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from '../types/types';
import { getStorageItem } from '../utils/localStorageUtil';

// Load stored user from localStorage
const storedUser = getStorageItem('currentUser') || null;

const initialState = {
    currentUser: storedUser,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            // Immutably update currentUser state
            return {
                ...state,
                currentUser: action.payload,
            };
        case CLEAR_CURRENT_USER:
            // Immutably update currentUser state
            return {
                ...state,
                currentUser: null,
            };
        default:
            return state;
    }
};

export default authReducer;