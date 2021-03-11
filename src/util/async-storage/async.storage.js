import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key, value) {
    await AsyncStorage.setItem(key, value);
};

export async function getItem(key) {
    const value = await AsyncStorage.getItem(key);
    return value;
};