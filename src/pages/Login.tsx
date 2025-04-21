import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api';
import { useNavigate } from '@tanstack/react-router';

import type { ApiErrorResponse, ApiSuccessResponse } from '../types/ApiResponse';
import type { AxiosResponse, AxiosError } from 'axios';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email є обов\'язковим')
    .email('Невірний формат email'),
  password: z.string()
    .min(1, 'Пароль повинен містити щонайменше 1 символ')
    .max(64, 'Пароль повинен бути менше 64 символів'),
  rememberMe: z.boolean().default(false)
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      const response: AxiosResponse<ApiSuccessResponse<string>> = await api.post('/auth/login', data);
      const jwtToken = response.data.data;
      if (data.rememberMe) {
        localStorage.setItem('token', jwtToken);
      } else {
        sessionStorage.setItem('token', jwtToken);
      }
      await navigate({ to: '/entities' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (
        axiosError.response?.status === 404 &&
        axiosError.response.data &&
        'errors' in axiosError.response.data
      ) {
        axiosError.response.data.errors.forEach((errorMessage) => {
          setError('email', { message: errorMessage });
          setError('password', { message: errorMessage });
        });
      } else {
        console.error('Login error:', error);
        setError('email', { message: 'Помилка при вході. Спробуйте пізніше.' });
        setError('password', { message: 'Помилка при вході. Спробуйте пізніше.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Увійти в акаунт
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register('email', { required: true })}
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="email"
                placeholder="your@email.com"
                type="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Пароль
              </label>
              <input
                {...register('password', { required: true })}
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="password"
                placeholder="••••••"
                type="password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                {...register('rememberMe')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="rememberMe"
                type="checkbox"
              />
              <label
                className="ml-2 block text-sm text-gray-900"
                htmlFor="rememberMe"
              >
                Запам'ятати мене
              </label>
            </div>
          </div>

          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
            >
              Увійти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
