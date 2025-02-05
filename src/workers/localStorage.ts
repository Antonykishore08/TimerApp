import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveDarkMode = async (payload: string) => {
  try {
    await AsyncStorage.setItem('DarkMode', payload?.toString());
  } catch (err) {
    console.log('saveTokenErr -->', err);

    return false;
  }
};

export const getDarkMode = async () => {
  try {
    const value = await AsyncStorage.getItem('DarkMode');
    return value;
  } catch {
    return false;
  }
};

export const removeDarkMode = async () => {
  try {
    const value = await AsyncStorage.removeItem('DarkMode');
    return value;
  } catch {
    return false;
  }
};