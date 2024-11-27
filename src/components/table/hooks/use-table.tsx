import { RowModel, useReactTable } from "@tanstack/react-table";
import { RowSpanFeature } from "../features/row-span";

export const useTable: typeof useReactTable = (options) => {
  options._features = [RowSpanFeature];
  const table = useReactTable(options);
  table.getRowModel = () => {
    return table.getSpannedRowModel?.() as RowModel<any>;
  };
  return table;
};
