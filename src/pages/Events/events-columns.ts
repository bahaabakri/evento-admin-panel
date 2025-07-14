import type { Column } from "../../UI/MainTable/MainTable";
import type { MyEvent } from "./events.type";

const eventsColumns: Column<MyEvent>[] = [
    
  { header: "Name", accessor: "name", type: 'string' },
  { header: "Date", accessor: "date", type: 'date' },
  { header: "Location", accessor: "location", type: 'string' },
{ header: "Is Active", accessor: "isActive", type: 'boolean' },
  { header: "Is Approved", accessor: "isApproved", type: 'boolean' }

]

export default eventsColumns