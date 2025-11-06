import { Table } from "@mantine/core";
import cx from "clsx";
import { transformIsoDateToReadable } from "@/services/date";
import { IconSquareRoundedX, IconChecks } from "@tabler/icons-react";
import { transformStringToReadable } from "@/services/format";
import { BASE_URL } from "@/services/api";
import type { Column } from "@/UI/MainTable/MainTable";
import { StatusObj } from "@/types/status.type";
import { renderTableCellValue } from "../../renders/renderTableCellValue";

const statusColorMap: Record<string, string> = {
  success: "text-success-5",
  error: "text-error-5",
  gray: "text-gray-5",
};

interface DetailsTableProps<T, StatusEnum> {
  columns: Column<T, StatusEnum>[];
  data: T;
}

const DetailsTable = <T, StatusEnum>({
  columns,
  data,
}: DetailsTableProps<T, StatusEnum>) => {
  const rows = columns.map((col) => (
    <tr key={String(col.accessor)} className=" odd:bg-gray-1 even:bg-gray-0">
      <td className="font-bold text-gray-8 px-5 py-3">{col.header}</td>
      <td className="px-5 py-3">{renderTableCellValue(col, data)}</td>
    </tr>
  ));

  return (
    <Table
      highlightOnHover
      horizontalSpacing="lg"
      verticalSpacing="sm"
      className="border rounded-xl overflow-hidden"
    >
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default DetailsTable;
