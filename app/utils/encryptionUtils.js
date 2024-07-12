// EncryptionUtil.js
import * as Crypto from 'expo-crypto';
import { generateEncryptionKey } from './supersecret';
// Function to encrypt data
export const encryptData = async (data) => {
    try {
        const key = await generateEncryptionKey();
        const encryptedData = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            `${data}-${key}`
        );
        return encryptedData;
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
};

// Function to decrypt data 
export const decryptData = async (encryptedData) => {
    try {
        const key = await generateEncryptionKey();
        const decryptedData = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            `${encryptedData}-${key}`
        );
        return decryptedData;
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
};