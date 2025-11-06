import cx from "clsx";
import { transformIsoDateToReadable } from "@/services/date";
import { IconSquareRoundedX, IconChecks } from "@tabler/icons-react";
import { transformStringToReadable } from "@/services/format";
import { BASE_URL } from "@/services/api";
import { StatusObj } from "@/types/status.type";
import { Column } from "../UI/MainTable/MainTable";
import { renderImage } from "./renderImage";

const statusColorMap: Record<string, string> = {
  success: "text-success-5",
  error: "text-error-5",
  gray: "text-gray-5",
};

// Generic render function reused by both tables
export function renderTableCellValue<T, StatusEnum>(
  col: Column<T, StatusEnum>,
  row: T
) {
  if (!col || !row) return null;
  const value = row[col.accessor];
  switch (col.type.kind) {
    case "array": {
      const arr = value as any[];
      const key = col.type.key;
      if (!Array.isArray(arr)) return "-";
      return (
        <div className="flex flex-wrap gap-1">
          {arr && arr.length > 0  ? arr.map((item, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-md text-xs font-medium bg-gray-1 text-roseRed-5 border border-roseRed-5"
            >
              {item[key] || "-"}
            </span>
          )): "-"}
        </div>
      );
    }

    case "date":
      return transformIsoDateToReadable(String(value));

    case "boolean":
      return value ? (
        <IconChecks color="var(--mantine-color-success-5)" />
      ) : (
        <IconSquareRoundedX color="var(--mantine-color-error-5)" />
      );

    case "string":
      return transformStringToReadable(value);

    case "status": {
      const color =
        col.type.values.find((el) => el.name === String(value))?.status ||
        "gray";
      return (
        <span className={cx("capitalize", statusColorMap[color])}>
          {String(value)}
        </span>
      );
    }

    case "image": {
      return renderImage(
        value,
        col.type.urlKey,
        col.type.nameKey,
        "w-12 h-12 object-contain rounded-md border border-gray-200 bg-gray-50"
      );
    }

    default:
      return null;
  }
}
