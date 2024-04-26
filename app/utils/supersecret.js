import * as Crypto from 'expo-crypto';

// Function to generate random bytes
export const generateRandomBytes = async (byteCount) => {
    try {
        const randomBytes = await Crypto.getRandomBytesAsync(byteCount);
        return randomBytes;
    } catch (error) {
        console.error('Random bytes generation error:', error);
        throw error;
    }
};

// Function to generate a random encryption key
export const generateEncryptionKey = async () => {
    try {
        const byteCount = 16; // You can adjust the byte count as needed
        const randomBytes = await generateRandomBytes(byteCount);
        const encryptionKey = randomBytes.reduce((key, byte) => key + byte.toString(16).padStart(2, '0'), '');
        return encryptionKey;
    } catch (error) {
        console.error('Encryption key generation error:', error);
        throw error;
    }
};