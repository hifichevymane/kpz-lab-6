import type { Entity, CreateEntityDTO, ApiResponse } from "../types/Entity";
import api from "../api";
import type { AxiosResponse } from 'axios';

type EntityResponse = AxiosResponse<ApiResponse<Entity>>;

export const getAllEntities = async (): Promise<Array<Entity>> => {
  const response: AxiosResponse<ApiResponse<Array<Entity>>> = await api.get("/posts");
  if ('errors' in response.data) return [];
  return response.data.data;
};

export const getEntityById = async (id: number): Promise<Entity | undefined> => {
  const response: EntityResponse = await api.get(`/posts/${id}`);
  if ('errors' in response.data) return;
  return response.data.data;
};

export const createEntity = async (entityDTO: CreateEntityDTO): Promise<Entity | undefined> => {
  const response: EntityResponse = await api.post('/posts', entityDTO);
  if ('errors' in response.data) return;
  return response.data.data;
};

export const updateEntity = async (id: number, data: Partial<Entity>): Promise<Entity | undefined> => {
  const response: EntityResponse = await api.patch(`/posts/${id}`, data);
  if ('errors' in response.data) return;
  return response.data.data;
}

export const deleteEntity = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
}
