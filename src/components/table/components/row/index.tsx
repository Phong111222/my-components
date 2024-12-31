import { HTMLProps, FC, PropsWithRef } from "react";
import { useTailwindMerge } from "../../../../hooks/use-tailwind-merge";

type RowProps = PropsWithRef<HTMLProps<HTMLTableRowElement>>;

const Row: FC<RowProps> = ({ ref, className, children, ...rest }) => {
  const mergedClassNames = useTailwindMerge("", className || "");

  return (
    <tr ref={ref} className={mergedClassNames} {...rest}>
      {children}
    </tr>
  );
};

export default Row;
