export interface ApiErrorResponse {
  errors: Array<string>;
}

export interface ApiSuccessResponse<T> {
  message: string;
  data: T;
}
