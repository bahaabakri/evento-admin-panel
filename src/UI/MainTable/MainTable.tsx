import { Table, ScrollArea, Loader } from "@mantine/core";
import { ReactNode, useState, type ReactElement } from "react";
import classes from "./MainTable.module.scss";
import cx from "clsx";
import { transformIsoDateToReadable } from "@/services/date";
import { IconSquareRoundedX, IconChecks } from "@tabler/icons-react";
import { StatusObj } from "@/types/status.type";
import { transformStringToReadable } from "@/services/format";
import { BASE_URL } from "@/services/api";
import { renderTableCellValue } from "../../renders/renderTableCellValue";
import React from "react";
type ColumnType<T, StatusEnum> =
  | { kind: "string" | "boolean" | "date" }
  | { kind: "status"; values: StatusObj<StatusEnum>[] }
  | { kind: "array"; key: string }
  | { kind: "image"; urlKey: string; nameKey: string };

export interface Column<T, StatusEnum = never> {
  header: string;
  accessor: keyof T;
  type: ColumnType<T, StatusEnum>;
}
interface MainTableProps<T, StatusEnum> {
  title?: string;
  data: T[];
  columns: Column<T, StatusEnum>[];
  loading?: boolean;
  errorMessage?: string | null;
  children?: ReactElement;
  isItTwoLevelsTable?: boolean;
  renderActions?: (row: T, rowIndex: number) => ReactElement;
  renderNestedRows?: (row: T, rowIndex: number) => ReactElement | null; // 👈 add this
}
const statusColorMap: Record<string, string> = {
  success: "text-success-5",
  error: "text-error-5",
  gray: "text-gray-5",
};
const MainTable = <T, StatusEnum>({
  children,
  title,
  data,
  columns,
  loading,
  errorMessage,
  renderActions,
  isItTwoLevelsTable = false,
  renderNestedRows,
}: MainTableProps<T, StatusEnum>) => {
  const [scrolled, setScrolled] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };
  const hasActions =
    renderActions &&
    data.some((row, index) => {
      const element = renderActions(row, index) as React.ReactElement | null;
      if (!element) return false;

      const children = React.Children.toArray(
        (element.props as any)?.children
      ).filter((child) => !!child);
      return children.length > 0;
    });

  const rows = data.map((row, rowIndex) => {
    const isExpanded = expandedRows.has(rowIndex);
    return (
      <React.Fragment key={rowIndex}>
        <Table.Tr>
          {isItTwoLevelsTable && (
            <Table.Td
              onClick={() => toggleRow(rowIndex)}
              className="cursor-pointer"
            >
              {isExpanded ? "▼" : "▶"}
            </Table.Td>
          )}

          {columns.map((col) => (
            <Table.Td key={String(col.accessor)}>
              {renderTableCellValue(col, row)}
            </Table.Td>
          ))}

          {hasActions && <Table.Td>{renderActions(row, rowIndex)}</Table.Td>}
        </Table.Tr>

        {isExpanded && renderNestedRows && (
          <Table.Tr>
            <Table.Td colSpan={columns.length + (hasActions ? 2 : 1)}>
              {renderNestedRows(row, rowIndex)}
            </Table.Td>
          </Table.Tr>
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <div className="flex justify-between align-center">
        {title && <h2 className={classes.title}>{title}</h2>}
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Loader />
        </div>
      ) : errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : data.length == 0 ? (
        <p className="text-gray-5 text-center">
          No Data Found, try to add data
        </p>
      ) : (
        <ScrollArea
          h="70vh"
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table miw={700}>
            <Table.Thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <Table.Tr>
                {isItTwoLevelsTable && <Table.Th></Table.Th>}

                {columns.map((col) => (
                  <Table.Th key={col.header}>{col.header}</Table.Th>
                ))}
                {hasActions && <Table.Th>Actions</Table.Th>}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </>
  );
};
export default MainTable;
