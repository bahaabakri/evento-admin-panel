import { UserStatus } from "@/enums/user-status.enum";
import { StatusObj } from "@/types/status.type";
import { User } from "@/types/user.type";
import type { Column } from "@/UI/MainTable/MainTable";

const userStatusObjs: StatusObj<UserStatus>[] = [
  {
    name: UserStatus.PENDING,
    status: "gray",
  },
  {
    name: UserStatus.APPROVED,
    status: "success",
  },
  {
    name: UserStatus.REJECTED,
    status: "error",
  },
];
const usersColumns: Column<User, UserStatus>[] = [
  { header: "Email", accessor: "email", type: {kind: "string"} },
  { header: "FirstName", accessor: "firstname", type: {kind: "string"} },
  { header: "LastName", accessor: "lastname", type: {kind: "string"}  },
  { header: "Phone", accessor: "phone", type: {kind: "string"} },
  { header: "Is Verified", accessor: "isVerified", type: {kind: "boolean"} },
  {
    header: "Status",
    accessor: "status",
    type: {kind: "status", values: userStatusObjs} 
  },
  {
    header: "Created At",
    accessor: "createdAt",
    type: {kind: "date"},
  },
];

export default usersColumns;
