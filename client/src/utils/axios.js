import axios from 'axios';

const instance = axios.create({
  baseURL  : "https://livello.vercel.app/api",
  withCredentials: true,
})

export default instance;