import { Link } from "@tanstack/react-router";
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
            Створено: {entity.createdAt}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800">
          {entity.title}
        </h3>

        <p className="text-gray-600">
          {entity.description}
        </p>

        <div className="text-sm text-gray-500">
          Оновлено: {entity.updatedAt}
        </div>

        <div className="pt-4 flex gap-2">
          <Link
            params={{ id: entity.id.toString() }}
            to="/entities/$id"
            className="w-fit bg-blue-600 text-white py-2 px-4 rounded-lg
                     hover:bg-blue-700 transition-colors duration-200 text-center
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Деталі
          </Link>
          <button
            className="w-fit bg-red-600 text-white py-2 px-4 rounded-lg
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
