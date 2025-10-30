import { UserStatus } from "@/enums/user-status.enum";
import { StatusObj } from "@/types/status.type";
import { User } from "@/types/user.type";
import type { Column } from "@/UI/MainTable/MainTable";
import { Role } from "./roles.type";

const rolesColumns: Column<Role>[] = [
  { header: "Name", accessor: "name", type: {kind: "string"} },
  { header: "Description", accessor: "description", type: {kind: "string"} },
    { header: "Permissions", accessor: "permissions", type: {kind: "array", key: 'name'} },

];

export default rolesColumns;