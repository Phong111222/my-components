import { HTMLProps, PropsWithRef } from "react";
import { useTailwindMerge } from "../../../../hooks/use-tailwind-merge";

import { Cell as TanstackCell } from "@tanstack/react-table";
type CellProps<TData> = PropsWithRef<
  HTMLProps<HTMLTableCellElement> & {
    cell: TanstackCell<TData, unknown>;
  }
>;

const Cell = <TData,>({
  ref,
  className,
  children,
  ...rest
}: CellProps<TData>) => {
  const mergedClassNames = useTailwindMerge(
    "border text-base px-8 py-4",
    className || "",
  );

  return (
    <td ref={ref} className={mergedClassNames} {...rest}>
      {children}
    </td>
  );
};

export default Cell;
