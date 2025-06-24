import axios from 'axios';

export const baseURL = "https://livello.onrender.com";

const instance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export default instance;