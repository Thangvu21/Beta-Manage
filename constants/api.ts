import Constants from 'expo-constants';
import { create } from 'react-test-renderer';
export const API_URL = 'http://10.0.2.2'

export const API = {
    login: `${API_URL}/auth/admin/login`,
    refreshToken: `${API_URL}/auth/admin/refresh`,

    // film
    getAllFilm: `${API_URL}/film`,
    getFilmDetail: `${API_URL}/film/`,
    createFilm: `${API_URL}/film/admin/`,
    updateFilm: `${API_URL}/film/admin/`,
    deleteFilm: `${API_URL}/film/admin/`,
    // food 
    getAllFood: `${API_URL}/item/admin/`,
    createFood: `${API_URL}/item/admin`,
    updateFood: `${API_URL}/item/admin`,
    deleteFood: `${API_URL}/item/admin`,
    // user
    changeAvatar: `${API_URL}/user`,
    getUser: `${API_URL}/user`,

    // scan boking
    scanBooking: `${API_URL}/booking/scan`,
    

};