import type { Entity } from "../../types/Entity";

let entities: Array<Entity> = [
  { id: 1, name: 'John Cena', description: 'John Cena', createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Sasuke Uchiha', description: 'Sasuke Uchiha', createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: 'Ichigo Kurosaki', description: 'Ichigo Kurosaki', createdAt: new Date(), updatedAt: new Date() },
];

export const getAllEntities = (): Array<Entity> => entities;

export const getEntityById = (id: number): Entity | undefined => {
  return entities.find(entity => entity.id === id);
};

export const createEntity = (entity: Entity): void => {
  entities.push(entity);
}

export const updateEntity = (id: number, data: Partial<Entity>): Entity | undefined => {
  let foundEntity = entities.find(entity => entity.id === id);
  if (foundEntity) foundEntity = { ...foundEntity, ...data };
  return foundEntity;
}

export const deleteEntity = (id: number): void => {
  entities = entities.filter(entity => entity.id !== id);
}
