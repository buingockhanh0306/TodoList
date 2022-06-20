import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://6257d472e4e0b73142813181.mockapi.io/api",
    headers:{
        'Content_Type': 'application/json',
    },
})

export default axiosClient