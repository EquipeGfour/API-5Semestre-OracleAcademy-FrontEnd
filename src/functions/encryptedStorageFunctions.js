import EncryptedStorage from 'react-native-encrypted-storage';


export const storageItem = async (key, value) => {
    try {
        await EncryptedStorage.setItem(key, value);
    } catch (error) {
        console.error(`Erro ao salvar o item '${key}' no armazenamento seguro:`, error);
        throw error;
    }
}

export const getStorageItem = async (key) => {
    try {
        const dados = await EncryptedStorage.getItem(key);
        return dados;
    } catch (error) {
        console.error(`Erro ao buscar o item '${key}' no armazenamento seguro:`, error);
        throw error;
    }
}

export const clearStorageItem = async (key) => {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.error(`Erro ao remover o item '${key}' no armazenamento seguro:`, error);
        throw error;
    }
}