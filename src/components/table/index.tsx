import {
  flexRender,
  getCoreRowModel,
  RowData,
  TableOptions,
} from "@tanstack/react-table";
import { useTable } from "./hooks/use-table";
import { HTMLProps } from "react";
import { EnhancedColumnDef } from "./type";
import { getSpannedRowModel } from "./features/row-span";
import { RowSpanOption } from "./hooks/type";
import { getFlattedColumns } from "./utils";
import Cell from "./components/cell";
import Header from "./components/header";
import Row from "./components/row";

type TableProps<TData extends RowData> = Pick<
  TableOptions<TData>,
  "data" | "enableTableRowSpan"
> &
  Omit<HTMLProps<HTMLTableElement>, "data"> & {
    columns: EnhancedColumnDef<TData>[];
  };

const Datagrid = <TData extends RowData>({
  className,
  enableTableRowSpan,
  ...options
}: TableProps<TData>) => {
  const rowSpanOption: RowSpanOption<TData> = enableTableRowSpan
    ? {
        enableTableRowSpan,
        getSpannedRowModel: getSpannedRowModel(),
        beSpannedColumnIds: getFlattedColumns(options.columns)
          .filter((ele) => !ele.enableGrouping && ele.enableRowSpan)
          .map((ele) => ele.id),
      }
    : {};
  const table = useTable({
    ...options,
    ...rowSpanOption,
    getSpannedRowModel: getSpannedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Header key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Header>
              );
            })}
          </Row>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Row key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return cell.rowSpan ? (
                  <Cell key={cell.id} rowSpan={cell.rowSpan}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ) : null;
              })}
            </Row>
          );
        })}
      </tbody>
    </table>
  );
};

export default Datagrid;
export type { EnhancedColumnDef };
