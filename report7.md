# Практично-лабораторне заняття №7

## Інтеграція клієнтської частини з RESTful API

### Мета
Підключити користувацький інтерфейс до реального серверного API. Ознайомитися з підходами до організації HTTP-запитів через Axios,
зберігання токенів доступу, обробки помилок, роботи з .env-змінними. Забезпечити повноцінну взаємодію клієнтської частини з бекендом.

## Завдання
Використовуючи реалізовану у попередньому завданні клієнтську частину (інтерфейс для роботи з сутністю Post), внести такі зміни:

### 1. Налаштування змінних оточення:
<img width="700" alt="Screenshot 2025-04-22 at 20 59 43" src="https://github.com/user-attachments/assets/ab397e97-79a3-4232-92d5-aa305815b658" />

### 2. Створити конфігурацію Axios:
- Створити окремий файл (наприклад, src/api/axios.ts)
- Налаштувати базовий baseURL, заголовок Content-Type, токен авторизації
- Реалізувати обробку помилок через інтерцептор (наприклад, логування у консоль або показ повідомлення)
```ts
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
```
### 3. Замінити мок-функції на реальні HTTP-запити:
У файлі з API-функціями (src/api/posts.ts або аналогічному) замінити реалізацію:
- getAllEntities() → GET /posts
- getEntityById(id) → GET /posts/:id
- createEntity(data) → POST /posts
- updateEntity(id, data) → PUT /posts/:id
- deleteEntity(id) → DELETE /posts/:id

Повернення типізованих відповідей із Axios бажане
```ts
import type { Entity, CreateEntityDTO } from "../types/Entity";
import type { ApiErrorResponse, ApiSuccessResponse } from "../types/ApiResponse";
import api from "../api";
import type { AxiosResponse, AxiosError } from 'axios';

type EntityResponse = AxiosResponse<ApiSuccessResponse<Entity>>;

export const getAllEntities = async (): Promise<Array<Entity>> => {
  try {
    const response: AxiosResponse<ApiSuccessResponse<Array<Entity>>> = await api.get("/posts");
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return [];
  }
};

export const getEntityById = async (id: number): Promise<Entity | null> => {
  try {
    const response: EntityResponse = await api.get(`/posts/${id}`);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
};

export const createEntity = async (entityDTO: CreateEntityDTO): Promise<Entity | null> => {
  try {
    const response: EntityResponse = await api.post('/posts', entityDTO);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
};

export const updateEntity = async (id: number, data: Partial<Entity>): Promise<Entity | null> => {
  try {
    const response: EntityResponse = await api.patch(`/posts/${id}`, data);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
}

export const deleteEntity = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return false;
  }
}
```

### 4. [Опціонально, для підвищення оцінки] Реалізувати UI для логіну:
- Створити окрему сторінку логіну (/login)
- Додати форму з полями email та password
- При сабміті відправляти POST /auth/login, отримувати JWT
- Зберігати токен у localStorage або sessionStorage
- Налаштувати Axios для використання збереженого токена
- Після успішного логіну — редирект на /posts

Додамо interceptors у файл з обʼєктом Axios:
```ts
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
```

Створимо сторінку з полями email та password:
<img width="1440" alt="Screenshot 2025-04-22 at 21 07 26" src="https://github.com/user-attachments/assets/b3828fe0-21f3-4ac5-bece-e22bd6fd5896" />

Форма має валідацію:

<img width="570" alt="Screenshot 2025-04-22 at 21 08 00" src="https://github.com/user-attachments/assets/0544ec5d-e801-4cc1-b0ec-b7cb8c4c3d52" />

Також є чекбокс "Запамʼятати мене":
- Якщо він увімкнений то зберігаємо токен у `localStorage`
- У іншому випадку - зберігаємо токун у `sessionStorage`

Після введення коректних даних та натискання кнопки "Увійти" нас викидає на сторінку з постами:

<img width="1440" alt="Screenshot 2025-04-22 at 21 10 49" src="https://github.com/user-attachments/assets/a8b24e88-056e-4446-8581-906b1c0a5af4" />
<img width="655" alt="Screenshot 2025-04-22 at 21 13 41" src="https://github.com/user-attachments/assets/35b54da6-7abc-4533-945b-6b9ca64574c9" />

При спробі зайти до сторінки логіну після авторизації - викидає на сторінку постів.

Якщо ми не залогінилися, але спробуємо перейти до сторінок сутностей - нас викине на сторінку логіну
