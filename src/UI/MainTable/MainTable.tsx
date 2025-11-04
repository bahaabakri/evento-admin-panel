import { Table, ScrollArea, Loader } from "@mantine/core";
import { useState, type ReactElement } from "react";
import classes from "./MainTable.module.scss";
import cx from "clsx";
import { transformIsoDateToReadable } from "@/services/date";
import { IconSquareRoundedX, IconChecks } from "@tabler/icons-react";
import { StatusObj } from "@/types/status.type";
import { transformStringToReadable } from "@/services/format";
import { BASE_URL } from "@/services/api";
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
  loading: boolean;
  errorMessage: string | null;
  children?: ReactElement;
  renderActions?: (row: T, rowIndex: number) => ReactElement;
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
}: MainTableProps<T, StatusEnum>) => {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {columns.map((col) => (
        <Table.Td key={String(col.accessor)}>
          {(() => {
            if (col.type.kind === "array") {
              const arr = row[col.accessor] as any[];
              const key = col.type.key; // ✅ safe narrowing

              return Array.isArray(arr) ? (
                <div className="flex flex-wrap gap-1">
                  {arr.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-gray-1 text-roseRed-5 border border-roseRed-5"
                    >
                      {item[key] || "-"}
                    </span>
                  ))}
                </div>
              ) : (
                "-"
              );
            }

            if (col.type.kind === "date") {
              return transformIsoDateToReadable(String(row[col.accessor]));
            }

            if (col.type.kind === "boolean") {
              return row[col.accessor] ? (
                <IconChecks color="var(--mantine-color-success-5)" />
              ) : (
                <IconSquareRoundedX color="var(--mantine-color-error-5)" />
              );
            }

            if (col.type.kind === "string") {
              return transformStringToReadable(row[col.accessor]);
            }

            if (col.type.kind === "status") {
              const color =
                col.type.values.find(
                  (el) => el.name === String(row[col.accessor])
                )?.status || "gray";
              return (
                <span className={cx("capitalize", statusColorMap[color])}>
                  {String(row[col.accessor])}
                </span>
              );
            }

            if (col.type.kind === "image") {
              const imageObj = Array.isArray(row[col.accessor])
                ? row[col.accessor][0]
                : row[col.accessor];

              const fallbackSrc = "/small-image-placeholder.png";
              const imageUrl = imageObj?.[col.type.urlKey]
                ? `${BASE_URL}${imageObj[col.type.urlKey]}`
                : fallbackSrc;

              const altText =
                imageObj?.[col.type.nameKey] || "Image not available";

              return (
                <img
                  className="w-12 h-12 object-contain rounded-md border border-gray-200 bg-gray-50"
                  src={imageUrl}
                  alt={altText}
                  onError={(e) => {                     
                    if (
                      e.currentTarget.src !==
                      window.location.origin + fallbackSrc
                    ) {
                      e.currentTarget.src = fallbackSrc;
                    }
                  }}
                />
              );
            }

            return null;
          })()}
        </Table.Td>
      ))}
      {renderActions && <Table.Td>{renderActions(row, rowIndex)}</Table.Td>}
    </Table.Tr>
  ));

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
                {columns.map((col) => (
                  <Table.Th key={col.header}>{col.header}</Table.Th>
                ))}
                {renderActions && <Table.Th>Actions</Table.Th>}
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
