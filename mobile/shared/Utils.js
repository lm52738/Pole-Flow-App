import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const isAuthenticated = async() => {
    boolean = () => {
        return AsyncStorage.getItem("user") != null;
    }
};

export const getUser = async() => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  } catch (err) {}
};

export const logOut = async() => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.log("error inside logout method");
  }
}
