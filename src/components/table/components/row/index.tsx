import { HTMLProps, PropsWithRef } from "react";
import { useTailwindMerge } from "../../../../hooks/use-tailwind-merge";
import { HeaderGroup, Row as TanstackRow } from "@tanstack/react-table";

type RowProps<TData> = PropsWithRef<
  HTMLProps<HTMLTableRowElement> & {
    row: TanstackRow<TData> | HeaderGroup<TData>;
  }
>;

const Row = <TData,>({
  ref,
  className,
  children,
  ...rest
}: RowProps<TData>) => {
  const mergedClassNames = useTailwindMerge("", className || "");

  return (
    <tr ref={ref} className={mergedClassNames} {...rest}>
      {children}
    </tr>
  );
};

export default Row;
