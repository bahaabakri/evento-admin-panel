import { UserStatus } from "@/enums/user-status.enum";
import { StatusObj } from "@/types/status.type";
import { User } from "@/types/user.type";
import type { Column } from "@/UI/MainTable/MainTable";
import adminsColumns from "../admins-columns";

const adminsDetailsColumns: Column<User, UserStatus>[] = [
  ...adminsColumns,
    {
    header: "Roles",
    accessor: "roles",
    type: { kind: "array", key: "name" },
  },
      {
    header: "Permissions",
    accessor: "permissions",
    type: { kind: "array", key: "name" },
  }
];

export default adminsDetailsColumns;