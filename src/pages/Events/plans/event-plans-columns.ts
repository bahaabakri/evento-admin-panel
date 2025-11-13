import type { Column } from "@/UI/MainTable/MainTable";
import { MyEventPlan } from "../events.type";

const eventPlansColumns: Column<MyEventPlan>[] = [
  { header: "Name", accessor: "name", type: { kind: "string" } },
  { header: "Price", accessor: "price", type: { kind: "string" } },
  { header: "Currency", accessor: "currency", type: { kind: "string" } },
  { header: "Capacity", accessor: "capacity", type: { kind: "string" } },
];

export default eventPlansColumns;
