import type { Column } from "@/UI/MainTable/MainTable";
import { HeroResponse } from "@/components/Hero/hero.type";

const heroesColumns: Column<HeroResponse>[] = [
  {
    header: "Image",
    accessor: "images",
    type: { kind: "image", urlKey: "url", nameKey: "name" },
  },
  { header: "Name", accessor: "name", type: { kind: "string" } },
  { header: "Title", accessor: "title", type: { kind: "string" } },
  { header: "Is Active", accessor: "isActive", type: { kind: "boolean" } },
  { header: "Description", accessor: "description", type: { kind: "string" } }
];

export default heroesColumns;