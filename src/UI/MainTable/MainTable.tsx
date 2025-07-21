import { Table, ScrollArea, Loader } from "@mantine/core";
import { useState, type ReactElement } from "react";
import classes from './MainTable.module.scss'
import cx from 'clsx';
import { transformIsoDateToReadable } from "../../services/date";
import { IconSquareRoundedX, IconChecks } from "@tabler/icons-react";
export interface Column<T> {
  header: string;
  accessor: keyof T;
  type: 'boolean' | 'date' | 'string'
}
interface MainTableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  loading:boolean;
  errorMessage:string | null;
  children:ReactElement
}
const MainTable = <T,>({children, title, data, columns, loading, errorMessage }: MainTableProps<T>) => {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {columns.map((col) => (
        <Table.Td key={String(col.accessor)}>
            {
                col.type == 'date' ? transformIsoDateToReadable(String(row[col.accessor]))
                : col.type == 'boolean' ? 
                row[col.accessor] ? 
                <IconChecks color="var(--mantine-color-success-5)" /> : 
                <IconSquareRoundedX color="var(--mantine-color-error-5)"/>
                : String(row[col.accessor])
            }
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <>
    <div className="flex justify-between align-center">
      {title && <h2 className={classes.title}>{title}</h2>}
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
      {
        loading
        ?   <div className="flex items-center justify-center h-20">
                <Loader />
            </div>
        : errorMessage ? <p className='error'>{errorMessage}</p>
        : (
          <ScrollArea h="70vh" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
              <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <Table.Tr>
                  {columns.map((col) => (
                    <Table.Th key={col.header}>{col.header}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        )
      }
    </>
  );
}
export default MainTable