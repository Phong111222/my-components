import { Cell } from "@tanstack/react-table";
import { EnhancedColumnDef } from "./type";

export const getValueReferenceBySpannedColIds = <TData,>(
  colIds: string[],
  cells: Cell<TData, any>[],
) => {
  return cells.reduce(
    (acc, cell) => {
      if (colIds.includes(cell.column.id)) {
        acc[cell.column.id] = cell.getValue();
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

export const getFlattedColumns = (
  columns: EnhancedColumnDef<any>[],
  flatted: EnhancedColumnDef<any>[] = [],
) => {
  for (let column of columns) {
    if (column.enableGrouping) {
      getFlattedColumns(
        (column as { columns: EnhancedColumnDef<any>[] }).columns,
        flatted,
      );
    } else {
      flatted.push(column);
    }
  }

  return flatted;
};
