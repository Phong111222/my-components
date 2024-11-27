import { ColumnDefBase, RowData, RowModel, Table } from "@tanstack/react-table";
import { EnhancedColumnDef } from "../type";

export type RowSpanOption<TData extends RowData> = {
  enableTableRowSpan?: boolean;
  beSpannedColumnIds?: string[];

  getSpannedRowModel?: (table: Table<TData>) => () => RowModel<TData>;
};

export type RowSpanColumn = {
  enableRowSpan?: boolean;
};

type RowSpanCell = {
  rowSpan: number;
};

type RowSpanInstance<TData extends RowData> = {
  getSpannedRowModel?: () => RowModel<unknown>;
  getPreSpannedRowModel: () => RowModel<TData>;
};
declare module "@tanstack/react-table" {
  interface TableOptionsResolved<TData extends RowData>
    extends RowSpanOption<TData> {}
  interface Table<TData extends RowData> extends RowSpanInstance<TData> {}
  interface Cell<TData extends RowData, TValue> extends RowSpanCell {}
  interface Column<TData extends RowData, TValue> extends RowSpanColumn {}
  interface IdentifiedColumnDef<TData extends RowData> extends RowSpanColumn {}

  interface GroupColumnDefBase<TData extends RowData, TValue = unknown>
    extends ColumnDefBase<TData, TValue> {
    columns?: EnhancedColumnDef<TData>[];
  }
}
