const initialState = {
    currentUser: null,
    loading: true,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
            };
        case 'CLEAR_CURRENT_USER':
            return {
                ...state,
                currentUser: null,
                loading: false,
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default authReducer;