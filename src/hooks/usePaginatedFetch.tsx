import { useState, useEffect, useCallback } from "react";
import { useHttp } from "@/hooks/useHttp";
import { MyResponsePagination } from "@/types/response.type.";

interface UsePaginatedFetchOptions<T> {
  endpoint: string;
  mapData?: (data: T[]) => any[];
  perPage?: number;
  minSearchLength?: number;
  mode?: "append" | "replace"; // 👈 NEW
  errorMessage?:string
}

export function usePaginatedFetch<T>({
  endpoint,
  mapData = (data) => data,
  perPage = 20,
  minSearchLength = 3,
  mode = "append", // 👈 default for infinite scroll
}: UsePaginatedFetchOptions<T>) {
  const { request, loading, errorMessage } = useHttp();

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🕒 Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchData = useCallback(
    async (reset = false) => {
      if (debouncedSearch && debouncedSearch.length < minSearchLength) return;

      const { data: response } = await request<MyResponsePagination<T>>(
        "get",
        `${endpoint}?page=${page}&perPage=${perPage}&query=${debouncedSearch}`
      );
      if (!response) return;

      const { data: items, meta } = response;
      const mapped = mapData(items);
      setTotal(meta.total);

      // 👇 Replace or append based on mode
      setData((prev) => {
        if (reset || mode === "replace") return mapped;
        return [...prev, ...mapped];
      });
    },
    [endpoint, page, debouncedSearch, perPage, mode]
  );

  useEffect(() => {
    fetchData(page === 1);
  }, [fetchData, page, debouncedSearch]);

  const loadMore = () => {
    if (data.length < total) setPage((prev) => prev + 1);
  };

  const reset = () => {
    setData([]);
    setPage(1);
  };

  return {
    data,
    total,
    loading,
    search,
    setSearch,
    page,
    setPage,
    loadMore,
    reset,
    errorMessage
  };
}
