import { useMultiStepForm } from "./components/multi-step-form";

type FormState = {
  basicInfo: {
    name: string;
  };
  additionalInfo: {
    phone: string;
    address: string;
  };
};

function App() {
  const { formState, handleSetFormState, handleGoToStep, currentStep } =
    useMultiStepForm<FormState>({
      defaultValue: {
        basicInfo: {
          name: "Frank",
        },
        additionalInfo: {
          phone: "123",
          address: "adsd",
        },
      },
      defaultStep: "basicInfo",
    });

  return <div className="App"></div>;
}

export default App;
