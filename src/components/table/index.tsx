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
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border px-8 py-4 text-[16px]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return cell.rowSpan ? (
                  <td
                    key={cell.id}
                    rowSpan={cell.rowSpan}
                    className="border text-base px-8 py-4"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ) : null;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Datagrid;
export type { EnhancedColumnDef };
