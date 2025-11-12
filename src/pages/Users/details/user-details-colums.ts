import { UserStatus } from "@/enums/user-status.enum";
import adminsColumns from "@/pages/Admins/admins-columns";
import { StatusObj } from "@/types/status.type";
import { User } from "@/types/user.type";
import type { Column } from "@/UI/MainTable/MainTable";

const userDetailsColumns: Column<User, UserStatus>[] = [
  ...adminsColumns,
];

export default userDetailsColumns;