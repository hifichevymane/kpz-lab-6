import type { Entity, CreateEntityDTO } from "../../types/Entity";

let entities: Array<Entity> = [
  { id: 1, name: 'John Cena', description: 'John Cena', createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Sasuke Uchiha', description: 'Sasuke Uchiha', createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: 'Ichigo Kurosaki', description: 'Ichigo Kurosaki', createdAt: new Date(), updatedAt: new Date() },
];

export const getAllEntities = (): Array<Entity> => entities;

export const getEntityById = (id: number): Entity | undefined => {
  return entities.find(entity => entity.id === id);
};

export const createEntity = (entityDTO: CreateEntityDTO): Entity => {
  const lastEntity = entities[entities.length - 1];
  const newEntity: Entity = {
    ...entityDTO,
    id: lastEntity ? lastEntity.id + 1 : 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  entities.push(newEntity);
  return newEntity;
};

export const updateEntity = (id: number, data: Partial<Entity>): Entity | undefined => {
  const foundEntityIndex = entities.findIndex(entity => entity.id === id);
  if (foundEntityIndex === -1) return;
  entities[foundEntityIndex] = { ...entities[foundEntityIndex], ...data } as Entity;
  return entities[foundEntityIndex];
}

export const deleteEntity = (id: number): void => {
  entities = entities.filter(entity => entity.id !== id);
}
