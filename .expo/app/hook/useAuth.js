import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useEffect, useReducer } from 'react';
import { app } from '../firebaseInitialize'; // Verifique se a importação do app está correta
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
    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            dispatch({ type: 'SET_CURRENT_USER', payload: user });
            return user;
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
            throw error;
        }
    };
    const registerWithEmailAndPassword = async (email, password, displayName) => {
        try {
            // Verificar se já existe um identificador único do dispositivo armazenado localmente

            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Obtenha uma referência à coleção de usuários
            const usersCollection = collection(db, 'users');

            // Gere um ID único para o usuário usando um timestamp combinado com um número aleatório
            const userId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();

            // Adicione os dados diretamente à coleção usando o ID gerado
            await addDoc(usersCollection, {
                userId: userId,
                displayName: displayName,
                email: email,
            });



            const user = userCredential.user;
            await sendEmailVerification(auth.currentUser, {
                url: 'https://gcalcada.github.io/TaskBuddy',
                handleCodeInApp: true,
                mode: 'verifyEmail',
                replyTo: email,
            });

            await updateProfile(user, {
                displayName: displayName
            });
            dispatch({ type: 'SET_CURRENT_USER', payload: user });
            return user;
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

    return {
        ...state,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        logout,
    };
};

export default useAuth;
