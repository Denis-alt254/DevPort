import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {"Content-Type": "application/json"},
    timeout:5000,
});

API.interceptors.request.use((config) => {  //hooks into every request made via axios
    const token = localStorage.getItem('token');  //retrieves jwt stored locally after login
    if(token){
        config.headers.Authorization = `Bearer ${token}`; //attaches the token to authorization headers which the backend can use to verify the identity
    }
    return config;  //ensures that axios uses the modified configuration when sending a request
});

export default API;