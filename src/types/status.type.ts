export type StatusObj<T> = {
    name: T;
    status: 'success' | 'error' | 'gray'
}