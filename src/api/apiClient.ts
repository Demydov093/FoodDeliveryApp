// import Config from 'react-native-config';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5000/api/v1';

export interface Category {
  id: string;
  name: string;
  ImageUrl?: string;
  products: Products[];
}

export interface Products {
  id: string;
  name: string;
  price: number;
  ImageUrl?: string;
  description?: string;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error?.response.data);
    return Promise.reject(error);
  },
);

// let authInterceptor: number | null = null;

export const fetchCategories = async () =>
  (await api.get('/categories')).data as Category;
