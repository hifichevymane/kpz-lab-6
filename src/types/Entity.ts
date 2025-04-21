export interface Entity {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateEntityDTO = Pick<Entity, 'title' | 'description'>;

export interface ApiErrorResponse {
  errors: Array<string>;
}

export interface ApiSuccessResponse<T> {
  message: string;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function isErrorResponse(response: ApiResponse<unknown>): response is ApiErrorResponse {
  return 'errors' in response;
}

export function isSuccessResponse<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return 'data' in response;
}
