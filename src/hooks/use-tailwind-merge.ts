import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export const useTailwindMerge = (...classNames: string[]) => {
  const mergedClassNames = useMemo(() => {
    return twMerge(...classNames);
  }, [classNames]);
  return mergedClassNames;
};
