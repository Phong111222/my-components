import { ColumnDef, RowData } from "@tanstack/react-table";

export type EnhancedColumnDef<TData extends RowData> = ColumnDef<TData> & {
  id: string;
} & (
    | {
        enableGrouping: true;
        columns: EnhancedColumnDef<TData>[];
      }
    | { enableGrouping?: false; enableRowSpan?: boolean }
  );
