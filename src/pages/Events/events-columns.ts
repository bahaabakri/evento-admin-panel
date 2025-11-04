import type { Column } from "@/UI/MainTable/MainTable";
import type { MyEvent } from "./events.type";

const eventsColumns: Column<MyEvent>[] = [
  {
    header: "Image",
    accessor: "images",
    type: { kind: "image", urlKey: "url", nameKey: "name" },
  },
  { header: "Name", accessor: "name", type: { kind: "string" } },
  { header: "Date", accessor: "date", type: { kind: "date" } },
  { header: "Location", accessor: "location", type: { kind: "string" } },
  { header: "Is Active", accessor: "isActive", type: { kind: "boolean" } },
  { header: "Is Approved", accessor: "isApproved", type: { kind: "boolean" } },
];

export default eventsColumns;
