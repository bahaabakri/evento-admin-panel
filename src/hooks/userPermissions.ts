import { useState, useEffect, useCallback } from "react";
import { useHttp } from "@/hooks/useHttp";
import { Permission } from "@/pages/Permissions/permissions.type";
import { MyResponsePagination } from "@/types/response.type.";

export const usePermissions = () => {
  const { request } = useHttp();
  const [permissions, setPermissions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const fetchPermissions = useCallback(async (reset = false) => {
    setLoading(true);
    const perPage = 20;

    const { data: dataRes } = await request<MyResponsePagination<Permission>>(
      "get",
      `/admin/permissions?page=${page}&perPage=${perPage}&query=${search}`
    );
        const {data, meta} = dataRes

    const mapped = data.map((p) => ({ label: p.name, value: p.id.toString() }));

    setPermissions((prev) => (reset ? mapped : [...prev, ...mapped]));
    setTotal(meta.total);
    setLoading(false);
  }, [page, search]);

  // fetch on page or search change
  useEffect(() => {
    fetchPermissions(page === 1);
  }, [fetchPermissions, page, search]);

  const loadMore = () => {
    if (permissions.length < total) setPage((prev) => prev + 1);
  };

  return { permissions, loading, search, setSearch, loadMore };
};
