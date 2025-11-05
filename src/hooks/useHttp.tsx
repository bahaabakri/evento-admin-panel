import { useState, useCallback } from "react";
import axios from "axios";
import { request as requestExt } from "@/services/api";
import { useNavigate } from "react-router-dom";

type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
};
type RequestResult<T> = {
  data: T | null;
  error: string | null;
};
export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate()
  const request = useCallback(
    async <T = unknown,>(
      method: "get" | "post" | "put" | "delete" | "patch",
      url: string,
      data?: unknown,
      config?: RequestConfig
    ): Promise<RequestResult<T>> => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await requestExt<T>(method, url, data, config);
        return { data: response, error: null };
      } catch (err: unknown) {
        let message = "Request failed";
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message || message;
          if(err.status === 401) {
            navigate("/auth/unauthorized", { replace: true });
          }
        } else if (err instanceof Error) {
          message = err.message;
        }
        setErrorMessage(message);
        return { data: null, error: message || "Something Went Wrong" };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    request,
    errorMessage
  };
}
