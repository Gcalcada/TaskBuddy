import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { useEffect, useReducer } from 'react';
import { app } from '../firebaseInitialize';
import authReducer from '../reducer/authReducer';
const useAuth = () => {
    const initialState = {
        currentUser: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    const auth = getAuth(app);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                dispatch({ type: 'SET_CURRENT_USER', payload: user });
            } else {
                dispatch({ type: 'CLEAR_CURRENT_USER' });
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const reloadUser = async () => {
        try {
            await auth.currentUser.reload(); // Recarrega os detalhes do usuário atual
        } catch (error) {
            console.error('Erro ao recarregar usuário:', error);
            throw error;
        }
    };

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Usuário logado:', user); // Adicione este console log
            const emailVerified = user.emailVerified;

            if (!emailVerified) {
                console.log('Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail para acessar todas as funcionalidades.');
            }
            dispatch(setCurrentUser(user));
            return user;

        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
            throw error;
        }
    };
    const RegWithEmailAndPassword = async (email, password, displayName) => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const usersCollection = collection(db, 'users');
            const userId = userCredential.user.uid;

            await addDoc(usersCollection, {
                userId: userId,
                displayName: displayName,
                email: email,
            });

            // Atualiza o perfil do usuário com o displayName
            await updateProfile(userCredential.user, {
                displayName: displayName
            });

            // Envia o e-mail de verificação
            await sendEmailVerification(auth.currentUser, {
                url: 'https://gcalcada.github.io/TaskBuddy',
                handleCodeInApp: true,
                mode: 'verifyEmail',
                replyTo: email,
            });

            // Verifica se o e-mail foi verificado
            const emailVerified = userCredential.user.emailVerified;
            if (!emailVerified) {
                console.log('Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail para acessar todas as funcionalidades.');
                return null;
            }

            return userCredential.user;
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
            throw error;
        }
    };


    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
        }
    };
    const setCurrentUser = (user) => {
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: user
        });
    };

    return {
        ...state,
        loginWithEmailAndPassword,
        setCurrentUser,
        RegWithEmailAndPassword,
        logout,
    };
};

export default useAuth;
