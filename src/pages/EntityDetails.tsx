import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Entity } from "../types/Entity";
import { updateEntity } from "../store/entities";

export default function EntityDetails(): JSX.Element {
  const entityData: Entity = useLoaderData({ from: '/entities/$id' });
  const [entity, setEntity] = useState<Entity>(entityData);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: entity.name,
    description: entity.description,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const updated = updateEntity(entity.id, {
      ...entity,
      ...formData,
      updatedAt: new Date()
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

      <form className="space-y-6" onSubmit={handleSubmit}>
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
            name="name"
            type="text"
            value={formData.name}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
              ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-100'
              }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Опис
          </label>
          <textarea
            disabled={!isEditing}
            name="description"
            rows={4}
            value={formData.description}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing
              ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-100'
              }`}
            onChange={handleChange}
          />
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
