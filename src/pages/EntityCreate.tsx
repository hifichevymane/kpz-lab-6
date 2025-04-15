import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { createEntity } from '../store/entities';

const entitySchema = z.object({
  name: z.string()
    .min(3, 'Назва повинна містити щонайменше 3 символи')
    .max(50, 'Назва повинна бути менше 50 символів'),
  description: z.string()
    .min(10, 'Опис повинен містити щонайменше 10 символів')
    .max(500, 'Опис повинен бути менше 500 символів'),
});

type EntityFormData = z.infer<typeof entitySchema>;

export default function EntityCreate(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
  });

  const onSubmit = async (data: EntityFormData): Promise<void> => {
    createEntity(data);
    await navigate({ to: '/entities' });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Створення нової сутності</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Назва
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="name"
            type="text"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="description"
          >
            Опис
          </label>
          <textarea
            {...register('description')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="description"
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            type="button"
            onClick={() => navigate({ to: '/entities' })}
          >
            Скасувати
          </button>
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Створити
          </button>
        </div>
      </form>
    </div>
  );
}
