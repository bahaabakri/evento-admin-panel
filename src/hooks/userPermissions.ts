import { useState, useEffect, useCallback } from "react";
import { useHttp } from "@/hooks/useHttp";
import { Permission } from "@/pages/Permissions/permissions.type";
import { MyResponsePagination } from "@/types/response.type.";
import { makeSelectUniqueByValue } from "@/services/form";

export const usePermissions = () => {
  const { request, loading } = useHttp();
  const [permissions, setPermissions] = useState<{ label: string; value: string }[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🕒 Debounce search (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1); // reset to first page on new search
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const fetchPermissions = useCallback(
    async (reset = false) => {
      // 🧠 only fetch if empty search OR at least 3 chars
      if (debouncedSearch && debouncedSearch.length < 3) return;
      const perPage = 20;

      const { data: dataRes } = await request<MyResponsePagination<Permission>>(
        "get",
        `/admin/permissions?page=${page}&perPage=${perPage}&query=${debouncedSearch}`
      );

      const { data, meta } = dataRes;
      const mapped = data.map((p) => ({ label: p.name, value: p.id.toString() }));
      
      setPermissions((prev) => (reset ? mapped : makeSelectUniqueByValue([...prev, ...mapped])));
      setTotal(meta.total);    },
    [page, debouncedSearch]
  );

  // 🔁 Fetch on page or debounced search change
  useEffect(() => {
    fetchPermissions(page === 1);
  }, [fetchPermissions, page, debouncedSearch]);

  const loadMore = () => {
    if (permissions.length < total) setPage((prev) => prev + 1);
  };

  return { permissions, loading, search, setSearch, loadMore };
};
