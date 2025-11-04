import type { Column } from "@/UI/MainTable/MainTable";
import { Permission } from "./permissions.type";

const permissionsColumns: Column<Permission>[] = [
  { header: "Name", accessor: "name", type: { kind: "string" } },
  { header: "Description", accessor: "description", type: { kind: "string" } },
  { header: "Module Name", accessor: "module", type: { kind: "string" } },
  { header: "Action Name", accessor: "action", type: { kind: "string" } },
];

export default permissionsColumns;
