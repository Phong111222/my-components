import { HTMLProps, PropsWithRef } from "react";
import { useTailwindMerge } from "../../../../hooks/use-tailwind-merge";
import { Header as TanstackHeader } from "@tanstack/react-table";

type Props<TData> = PropsWithRef<
  HTMLProps<HTMLTableCellElement> & {
    header: TanstackHeader<TData, unknown>;
  }
>;

const Header = <TData,>({
  className,
  children,
  header,
  ref,
  ...rest
}: Props<TData>) => {
  const mergedClassNames = useTailwindMerge(
    "border px-8 py-4 text-[16px]",
    className || "",
  );

  return (
    <th ref={ref} className={mergedClassNames} {...rest}>
      {children}
    </th>
  );
};

export default Header;
