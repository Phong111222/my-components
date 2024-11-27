import {
  Row,
  RowModel,
  Table,
  TableFeature,
  getMemoOptions,
  memo,
} from "@tanstack/react-table";
import _ from "lodash";
import { RowSpanOption } from "../hooks/type";
import { getValueReferenceBySpannedColIds } from "../utils";

export const RowSpanFeature: TableFeature<unknown> = {
  getDefaultOptions(): RowSpanOption<unknown> {
    return {
      enableTableRowSpan: false,
    };
  },
  createCell(cell) {
    cell.rowSpan = 1;
  },
  createTable(table) {
    table.getPreSpannedRowModel = () => table.getPrePaginationRowModel();
    table.getSpannedRowModel = () => {
      if (
        table.options.enableTableRowSpan &&
        table.options.getSpannedRowModel
      ) {
        return table.options.getSpannedRowModel(table)();
      }
      return table.getPreSpannedRowModel();
    };
  },
};

export function getSpannedRowModel<TData>(): (
  table: Table<TData>,
) => () => RowModel<TData> {
  return (table) =>
    memo(
      () => [table.getPreSpannedRowModel()],
      (rowModel) => {
        const { enableTableRowSpan, beSpannedColumnIds } = table.options;
        if (!enableTableRowSpan) {
          return rowModel;
        }

        const newModel = { ...rowModel };
        const allRows = newModel.rows;
        const beSpannedRowsByColIds = allRows.reduce(
          (acc, row) => {
            const obj = getValueReferenceBySpannedColIds(
              beSpannedColumnIds || [],
              row.getAllCells(),
            );
            if (!acc.length) {
              acc.push({ row, rowSpan: 1 });
              return acc;
            }
            const prevObj = getValueReferenceBySpannedColIds(
              beSpannedColumnIds || [],
              acc[acc.length - 1].row.getAllCells(),
            );
            if (!_.isEqual(obj, prevObj)) {
              acc.push({ row, rowSpan: 1 });
              return acc;
            }
            acc[acc.length - 1].rowSpan++;
            return acc;
          },
          [] as { row: Row<TData>; rowSpan: number }[],
        );
        allRows.forEach((row) => {
          const cells = row.getVisibleCells();

          cells.forEach((cell) => {
            cell.rowSpan = 1;

            if (!beSpannedColumnIds?.includes(cell.column.id)) {
              return;
            }

            const found = beSpannedRowsByColIds.find(
              (ele) => ele.row.id === cell.row.id,
            );

            if (found) {
              cell.rowSpan = found.rowSpan;
            } else {
              cell.rowSpan = 0;
            }
          });
        });
        newModel.rows = allRows;
        return newModel;
      },
      getMemoOptions(table.options, "debugTable", "getSpannedRowModel"),
    );
}
