import axios from 'axios'; 

const axiosInstense = axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true,
})

export default axiosInstense; 