import type { Entity } from "../../../types/Entity";

interface Props {
  entity: Entity;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EntityCard({ entity, onClick }: Props): JSX.Element {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">ID: {entity.id}</span>
          <span className="text-sm text-gray-500">
            Створено: {entity.createdAt.toISOString()}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800">
          {entity.name}
        </h3>

        <p className="text-gray-600">
          {entity.description}
        </p>

        <div className="text-sm text-gray-500">
          Оновлено: {entity.updatedAt.toISOString()}
        </div>

        <div className="pt-4">
          <button
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg
                     hover:bg-red-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={onClick}
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}
