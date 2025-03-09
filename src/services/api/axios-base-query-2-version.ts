import { apiConfig } from "@/config/api";
import { JsonApiResponse } from "@/types/json-api.types";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import api, { apiState } from "./axios";
import { JsonApiException } from "./json-api.interceptor";
export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export const axiosBaseQuery2Version =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async (requestConfig) => {
    try {
      console.log("AXIOS BASE QUERY");
      console.log("URL", requestConfig.url);
      console.log("METHOD", requestConfig.method);
      console.log("DATA", requestConfig.data);
      console.log("PARAMS", requestConfig.params);

      if (!apiState.isReady) {
        return {
          error: {
            status: 401,
            data: {
              errors: ["API is not ready"],
              message: "API is not ready",
            },
          },
        };
      }

      const response = await api({
        ...requestConfig,
        method: requestConfig.method ?? "GET",
        headers: {
          ...apiConfig.headers,
          ...requestConfig.headers,
        },
      });

      console.log(`RESPONSE ${requestConfig.url}`, response);

      // Handle the response based on whether it's a collection or single resource
      return response;
    } catch (error) {
      // Handle JSON:API specific errors
      if (error instanceof JsonApiException) {
        return {
          error: {
            status: error.status,
            data: {
              errors: error.errors,
              message: error.message,
            },
          },
        };
      }

      // Handle other Axios errors
      const axiosError = error as AxiosError<JsonApiResponse<unknown>>;
      const errors = axiosError.response?.data?.errors || [];

      return {
        error: {
          status: axiosError.response?.status,
          data: {
            errors,
            message: errors[0]?.detail || axiosError.message,
          },
        },
      };
    }
  };
