import Constants from 'expo-constants';
;export const API_URL = 'http://10.0.2.2'

export const API = {

    hostImage: `${API_URL}`,
    // socket
    host: `${API_URL}:3012`,

    login: `${API_URL}/auth/admin/login`,
    refreshToken: `${API_URL}/auth/admin/refresh`,

    // film
    getAllFilm: `${API_URL}/film/`,
    getFilmDetail: `${API_URL}/film/`,
    createFilm: `${API_URL}/film/admin/`,
    updateFilm: `${API_URL}/film/admin/`,
    deleteFilm: `${API_URL}/film/admin/`,
    // food 
    getAllFood: `${API_URL}/booking/item/admin/`,
    createFood: `${API_URL}/booking/item/admin/`,
    updateFood: `${API_URL}/booking/item/admin`,
    updateFoodImage: `${API_URL}/booking/item/admin/image`,
    deleteFood: `${API_URL}/booking/item/admin`,
    // get info and change avatar admin
    changeAvatar: `${API_URL}/admin/avatar`,
    getUser: `${API_URL}/admin`,
    createAdmin: `${API_URL}/admin`,

    // cinema
    getAllCinema: `${API_URL}/cinema/`,
    getCinemaDetail: `${API_URL}/cinema/`,
    createCinema: `${API_URL}/cinema/admin/`,
    updateCinema: `${API_URL}/cinema/admin/`,
    deleteCinema: `${API_URL}/cinema/admin/`,
    // notification
    getAllNotification: `${API_URL}/notification/admin`,
    getNotificationDetail: `${API_URL}/notification/`,
    createNotification: `${API_URL}/notification/admin/`,
    updateNotification: `${API_URL}/notification/admin`,
    deleteNotification: `${API_URL}/notification/admin`,

    // showtime
    getAllShowtime: `${API_URL}/showtime/admin`,
    getShowtimeDetail: `${API_URL}/showtime/`,
    createShowtime: `${API_URL}/showtime/admin/`,
    updateShowtime: `${API_URL}/showtime/admin/`,
    deleteShowtime: `${API_URL}/showtime/admin/`,

    // scan booking
    scanBooking: `${API_URL}/booking/admin`,
    
    // conversation
    getAllConver: `${API_URL}/chat/conversation/admin`,
    // message
    getAllMessage: `${API_URL}/chat/message/admin`,
    sendMessage: `${API_URL}/chat/message/admin`,

    // analyst 
    // query: month, year
    getAnalystRevenue: `${API_URL}/booking/admin/movie/price`,
    // query: year
    getAnalystFilm: `${API_URL}/booking/admin/month/price`,
};