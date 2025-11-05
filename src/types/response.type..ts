import { Pagination } from "./pagination.type";

export type  MyResponsePagination<T> =  {
    data: T[];
    meta: Pagination
}

export type MyResponse<T, K extends string> = {
  message: string;
} & {
  [P in K]: T;
};