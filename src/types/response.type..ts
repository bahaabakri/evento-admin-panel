import { Pagination } from "./pagination.type";

export type  MyResponse<T> =  {
    data: T[];
    meta: Pagination
}