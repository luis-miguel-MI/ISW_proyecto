import axios from 'axios'

//Siempre que usemos axios se utilizara este cliente axiso

const clienteAxios = axios.create ({
    baseURL : process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;
