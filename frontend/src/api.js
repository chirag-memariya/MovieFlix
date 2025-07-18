import axios from 'axios';

const API_URL = 'http://3.109.202.127/:8000';
export const client = axios.create({ baseURL: API_URL });
