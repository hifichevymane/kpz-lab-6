import axios, { type InternalAxiosRequestConfig } from 'axios';

declare global {
  interface ImportMetaEnv {
    VITE_APP_ENVIRONMENT: string;
    VITE_API_BASE_URL: string;
  }
}

// Створюємо інстанс
const api = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
  headers: { 'Content-Type': 'application/json' },
});

// Додаємо токен перед кожним запитом
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (error: Error) => Promise.reject(error)
);

// Обробка помилок у відповіді
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // Якщо отримано 401 -- очищуємо токен і редіректимо на логін
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error('Unknown error occurred'));
  }
);

export default api;