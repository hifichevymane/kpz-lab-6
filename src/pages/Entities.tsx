import type { Entity } from "../types/Entity";
import { getAllEntities, deleteEntity } from "../store/entities";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import EntityCard from "../components/ui/EntityCard";
import Modal from "../components/ui/Modal";

export default function Entities(): JSX.Element {
  const navigate = useNavigate();
  const [entities, setEntities] = useState<Array<Entity>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEntityId, setSelectedEntityId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const entities = await getAllEntities();
      setEntities(entities);
    }
    void fetchPosts();
  }, []);

  const navigateToCreateEntityPage = (): Promise<void> => navigate({ to: '/entities/new' });

  const handleDeleteClick = (id: number): void => {
    setSelectedEntityId(id);
    setShowModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (selectedEntityId !== null) {
      deleteEntity(selectedEntityId);
      const entities = await getAllEntities();
      setEntities(entities);
      setShowModal(false);
    }
  };

  return (
    <>

      <h1 className="text-3xl font-bold my-3 text-center">Перелік сутностей:</h1>
      <ul>
        {entities.map(entity => (
          <li key={entity.id}>
            <EntityCard entity={entity} onClick={() => { handleDeleteClick(entity.id); }} />
          </li>
        ))}
      </ul>
      <button
        className='bg-blue-600 text-white px-5 py-3 rounded-3xl mx-auto my-5 block font-bold text-2xl'
        onClick={navigateToCreateEntityPage}
      >Створити новий екземпляр</button>
      <Modal
        bodyMessage="Ви впевнені, що хочете видалити цей елемент?"
        headerMessage="Підтвердження видалення"
        show={showModal}
        onCancel={() => { setShowModal(false); }}
        onConfirm={confirmDelete}
      />
    </>
  );
}
