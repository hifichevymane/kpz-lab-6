import type { Entity, CreateEntityDTO } from "../../types/Entity";
import api from "../../api";
import type { AxiosResponse } from 'axios';

let entities: Array<Entity> = [
  { id: 1, title: 'John Cena', description: 'John Cena', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, title: 'Sasuke Uchiha', description: 'Sasuke Uchiha', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, title: 'Ichigo Kurosaki', description: 'Ichigo Kurosaki', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const getAllEntities = async (): Promise<Array<Entity>> => {
  const response: AxiosResponse<{ data: Array<Entity> }> = await api.get("/posts");
  console.log(response.data.data);
  return response.data.data;
};

export const getEntityById = (id: number): Entity | undefined => {
  return entities.find(entity => entity.id === id);
};

export const createEntity = (entityDTO: CreateEntityDTO): Entity => {
  const lastEntity = entities[entities.length - 1];
  const newEntity: Entity = {
    ...entityDTO,
    id: lastEntity ? lastEntity.id + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
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
