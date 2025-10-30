import { Permission } from "../Permissions/permissions.type";

export type Role = {
    id: number;
    name:string;
    description:string;
    permissions: Permission[]
}