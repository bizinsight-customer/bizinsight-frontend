import { JsonApiError, JsonApiResponse } from "@/types/json-api.types";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export class JsonApiException extends Error {
  constructor(
    message: string,
    public errors: JsonApiError[],
    public status?: number
  ) {
    super(message);
    this.name = "JsonApiException";
  }
}

export const setupJsonApiInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response: AxiosResponse<JsonApiResponse<unknown>>) => {
      // Check if response has errors
      if (response.data?.errors?.length) {
        const error = new JsonApiException(
          response.data.errors[0]?.detail || "API Error",
          response.data.errors,
          response.status
        );
        return Promise.reject(error);
      }
      return response;
    },
    (error: AxiosError<JsonApiResponse<unknown>>) => {
      // Handle error responses
      if (error.response?.data?.errors) {
        const apiError = new JsonApiException(
          error.response.data.errors[0]?.detail || error.message,
          error.response.data.errors,
          error.response.status
        );
        return Promise.reject(apiError);
      }
      return Promise.reject(error);
    }
  );
};
