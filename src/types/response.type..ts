import { Pagination } from "./pagination.type";

export type  MyResponsePagination<T> =  {
    data: T[];
    meta: Pagination
}