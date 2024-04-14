import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    message: messageReducer,
    auth: authReducer,

});

export default rootReducer;