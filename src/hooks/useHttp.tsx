import { useState, useCallback } from 'react';
import axios from 'axios';
import {request as requestExt} from '@/services/api';


type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
};

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

    const request = useCallback(async <T = unknown>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await requestExt<T>(
        method,
        url,
        data,
        config,
      );
      return response;
    } catch (err: unknown) {
      let message = 'Request failed';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    request,
  };
}