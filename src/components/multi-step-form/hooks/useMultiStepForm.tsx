import { useState } from "react";

export type MultiStepFormOption<
  T extends Record<string | number, Record<string, any>>,
> = {
  defaultValue?: Partial<{
    [key in keyof T]: T[key];
  }>;
  defaultStep?: keyof T;
};

export type MultiStepFormState<
  T extends Record<string | number, Record<string, any>>,
> = NonNullable<NonNullable<MultiStepFormOption<T>["defaultValue"]>>;

export const useMultiStepForm = <T extends Record<number, Record<string, any>>>(
  option: MultiStepFormOption<T>,
) => {
  const [formState, setFormState] = useState<MultiStepFormState<T>>(
    option.defaultValue || {},
  );

  const [currentStep, setCurrentStep] = useState<keyof T>(() => {
    return option?.defaultStep ?? 0;
  });

  const handleGoToStep = (step: typeof currentStep) => {
    setCurrentStep(step);
  };

  const handleSetFormState = <
    Step extends keyof NonNullable<typeof formState>,
    V extends T[Step],
  >(
    step: Step,
    value: V,
  ) => {
    setFormState((prev) => {
      return {
        ...prev,
        [step]: value,
      } as typeof formState;
    });
  };

  const getStepFormValue = (value: keyof T) => {
    return value;
  };

  return {
    formState: (formState ?? {}) as NonNullable<typeof formState>,
    currentStep,
    handleGoToStep,
    handleSetFormState,
    getStepFormValue,
  };
};
