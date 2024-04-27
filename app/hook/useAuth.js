import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { addDoc, collection, getFirestore } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReducer } from 'react';
import { clearCurrentUser, setCurrentUser } from '../actions/authActions';
import { app } from '../firebaseInitialize';
import authReducer from '../reducer/authReducer';
import { encryptData } from '../utils/encryptionUtils';
import { generateEncryptionKey } from '../utils/supersecret';
const useAuth = () => {


    const [state, dispatch] = useReducer(authReducer);
    const auth = getAuth(app);
    const db = getFirestore();
    const user = auth.user;
    const checkAuthStatus = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                // User is authenticated, return true
                return true;
            } else {
                // User is not authenticated, return false
                return false;
            }
        } catch (error) {
            console.error('Error checking authentication status:', error);
            // Handle error here, such as returning false or displaying an error message
            return false;
        }
    };



    const reloadUser = async () => {
        try {
            await auth.currentUser.reload();
        } catch (error) {
            console.error('Erro ao recarregar usuário:', error);
            throw error;
        }
    };
    const loginWithGoogle = async () => {
        try {
            // ... (Google OAuth configuration - same as before)

            const result = await auth.startAsync(config);

            if (result.type === 'success') {

                const { idToken, user } = result.params;
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                const userCredential = await auth.signInWithCredential(googleCredential);

                // Check if user exists in Firestore
                const usersCollection = collection(db, 'users');
                const userDoc = await userRef.get();

                if (!userDoc.exists) {
                    // New user - register them
                    await addDoc(usersCollection, {
                        userId: userId,
                        displayName: encryptedDisplayName,
                        email: encryptedEmail,
                        createdAt: timestamp,
                    });
                    console.log('New user registered:', userCredential.user);
                } else {
                    // Existing user - log them in
                    console.log('User logged in:', userCredential.user);
                }

                // ... (dispatch actions to update user state)

            } else {
                // ... (handle auth failure)
            }
        } catch (error) {
            // ... (handle errors)
        }
    };

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;



            if (!user.emailVerified) {
                console.log('Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail para acessar todas as funcionalidades.');
            }
            dispatch(setCurrentUser(user))
            await AsyncStorage.setItem('user', JSON.stringify(user));

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
            const timestamp = new Date();
            const encryptionKey = await generateEncryptionKey();
            console.log('Encryption Key:', encryptionKey);
            const encryptedEmail = await encryptData(email, encryptionKey);
            const encryptedDisplayName = await encryptData(displayName, encryptionKey);


            await addDoc(usersCollection, {
                userId: userId,
                displayName: encryptedDisplayName,
                email: encryptedEmail,
                createdAt: timestamp,
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
            dispatch(clearCurrentUser);
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error.message });
        }
    };


    return {
        ...state,
        loginWithGoogle,
        checkAuthStatus,
        loginWithEmailAndPassword,
        RegWithEmailAndPassword,
        logout,
    };
};

export default useAuth;
