import axios from 'axios';
import {URL} from './constants/config';
import AsyncStorage from '@react-native-community/async-storage';

export default class requests {

    isLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('cookie')
            return value
        } catch (e) {
            // error reading value
            return e
        }
    }


    loginUser = (
        email: string,
        password: string
    ) => {
        const data = {email, password};
        const headers = {
            'Content-Type': 'application/json',
        }
        return axios.post(URL + '/authenticate', data, {headers}).then(response => response).catch(error => error)
    }

    getUserData = async () => {
        const cookie = await AsyncStorage.getItem('cookie')
        const headers = {
            'Content-Type': 'multipart/form-data',
            "cookie": cookie
        }
        return axios.get(URL + '/getUserData', {headers}).then(response => response).catch(error => error)
    }

    resetPassword = async (user: string) => {
        const data = {user};
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        return axios.post(URL + '/resetPassword', data, {headers}).then(response => response).catch(error => error)
    }


}
