import { HTMLProps, FC, PropsWithRef } from "react";
import { useTailwindMerge } from "../../../../hooks/use-tailwind-merge";

type CellProps = PropsWithRef<HTMLProps<HTMLTableCellElement>>;

const Cell: FC<CellProps> = ({ ref, className, children, ...rest }) => {
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
