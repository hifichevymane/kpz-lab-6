import type { Entity, CreateEntityDTO } from "../types/Entity";
import type { ApiErrorResponse, ApiSuccessResponse } from "../types/ApiResponse";
import api from "../api";
import type { AxiosResponse, AxiosError } from 'axios';

type EntityResponse = AxiosResponse<ApiSuccessResponse<Entity>>;

export const getAllEntities = async (): Promise<Array<Entity>> => {
  try {
    const response: AxiosResponse<ApiSuccessResponse<Array<Entity>>> = await api.get("/posts");
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return [];
  }
};

export const getEntityById = async (id: number): Promise<Entity | null> => {
  try {
    const response: EntityResponse = await api.get(`/posts/${id}`);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
};

export const createEntity = async (entityDTO: CreateEntityDTO): Promise<Entity | null> => {
  try {
    const response: EntityResponse = await api.post('/posts', entityDTO);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
};

export const updateEntity = async (id: number, data: Partial<Entity>): Promise<Entity | null> => {
  try {
    const response: EntityResponse = await api.patch(`/posts/${id}`, data);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
}

export const deleteEntity = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return false;
  }
}
