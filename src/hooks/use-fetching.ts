import { useState } from "react";

export type ApiResult<TData extends object> = {
  status: "success" | "error" | "fetching" | "idle";
  data?: TData;
};

export type UseFetchingResult<
  TData extends object,
  TParams extends Record<string, any>,
  Bool extends boolean,
> = ApiResult<TData> & {
  params: TParams & Omit<Pagination<Bool>, "hasPagination">;
  handleChangeParams: (
    newParams: TParams & Omit<Pagination<Bool>, "hasPagination">,
  ) => void;
};

export type PaginationState = {
  offset: number;
  limit: number;
};

export type Pagination<Bool extends boolean> = Bool extends true
  ? {
      hasPagination: Bool;
    } & PaginationState
  : { hasPagination?: Bool };

export type UseFetchingArgs<
  T extends Omit<Record<string, any>, keyof PaginationState>,
  Bool extends boolean,
> = {
  hasPagination?: Bool;
  params: T & Omit<Pagination<Bool>, "hasPagination">;
};

type ParamsType<
  TArgs extends Record<string, any>,
  Bool extends boolean,
> = UseFetchingArgs<TArgs, Bool>["params"] &
  Omit<Pagination<Bool>, "hasPagination">;

export const useFetching = <
  TData extends object,
  TArgs extends Record<string, any>,
  Bool extends boolean = false,
>(
  args: UseFetchingArgs<TArgs, Bool>,
): UseFetchingResult<TData, UseFetchingArgs<TArgs, Bool>["params"], Bool> => {
  const [params, setParams] = useState<ParamsType<TArgs, Bool>>(() => {
    const { params, hasPagination, ...rest } = args;
    return {
      ...params,
      ...rest,
    };
  });

  const [result] = useState<ApiResult<TData>>({
    status: "idle",
  });

  return {
    ...result,
    params,
    handleChangeParams: (newParams) => {
      setParams((prev) => ({ ...prev, ...newParams }));
    },
  };
};
