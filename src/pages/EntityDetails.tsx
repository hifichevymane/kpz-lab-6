import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Entity } from "../types/Entity";
import { updateEntity } from "../store/entities";

const entitySchema = z.object({
  title: z.string()
    .min(3, 'Назва повинна містити щонайменше 3 символи')
    .max(50, 'Назва повинна бути менше 50 символів'),
  description: z.string()
    .min(10, 'Опис повинен містити щонайменше 10 символів')
    .max(500, 'Опис повинен бути менше 500 символів'),
});

type EntityFormData = z.infer<typeof entitySchema>;

export default function EntityDetails(): JSX.Element {
  const navigate = useNavigate();
  const entityData: Entity = useLoaderData({ from: '/entities/$id' });
  const [entity, setEntity] = useState<Entity>(entityData);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
    defaultValues: {
      title: entity.title,
      description: entity.description,
    }
  });

  const onSubmit = (data: EntityFormData): void => {
    const updated = updateEntity(entity.id, {
      ...entity,
      ...data,
      updatedAt: new Date().toISOString()
    });
    if (!updated) return;
    setEntity(updated);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Деталі сутності</h1>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => { setIsEditing(!isEditing); }}
        >
          {isEditing ? 'Скасувати' : 'Редагувати'}
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID
          </label>
          <input
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
            type="text"
            value={entity.id}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Назва
          </label>
          <input
            disabled={!isEditing}
            {...register('title')}
            type="text"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
              ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-100'
              }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Опис
          </label>
          <textarea
            disabled={!isEditing}
            {...register('description')}
            rows={4}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
              ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-100'
              }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Створено
          </label>
          <input
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
            type="text"
            value={new Date(entity.createdAt).toLocaleString('uk-UA')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Оновлено
          </label>
          <input
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
            type="text"
            value={new Date(entity.updatedAt).toLocaleString('uk-UA')}
          />
        </div>

        <div className="flex gap-4">
          <button
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            type="button"
            onClick={() => navigate({ to: '/entities' })}
          >
            Назад
          </button>
          {isEditing && (
            <button
              className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              type="submit"
            >
              Зберегти
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
