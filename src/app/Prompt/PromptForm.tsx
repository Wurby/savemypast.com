import * as React from "react";
import { useFetcher } from "react-router-dom";
import PromptField from "./PromptField";
import PromptDisplay from "./PromptDisplay";
import type { PromptForm } from "./PromptForm.d";
import Button from "../../components/Button";
import Text from "../../components/Text";

export const storeSubmissionsInLocalStorage = (data: PromptForm) => {
  const submissions = JSON.parse(
    localStorage.getItem("promptSubmissions") || "[]"
  );
  localStorage.setItem(
    "promptSubmissions",
    JSON.stringify([...submissions, data])
  );
};

const PromptForm: React.FC = () => {
  const fetcher = useFetcher();

  const [formErrorMessages, setFormErrorMessages] = React.useState<string[]>(
    []
  );
  const [formState, dispatch] = React.useReducer(
    (state: PromptForm, action: Partial<PromptForm>) => ({
      ...state,
      ...action,
    }),
    {
      prompt: "",
      promptResponse: "",
      age: 0,
      creationDate: "",
      assistantPrompts: [],
    }
  );

  React.useEffect(() => {
    dispatch({ creationDate: new Date().toISOString().split("T")[0] });
    dispatch({ age: 0 });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const errors = [];
    if (!formState.promptResponse) {
      errors.push("Prompt response is required.");
    }
    if (!formState.age) {
      errors.push("Age is required.");
    }
    setFormErrorMessages(errors);
    return errors.length === 0;
  };

  const handleAssistantPrompts = () => {
    const fakePrompts = [
      "While you were doing this, what were you thinking?",
      "What was the hardest part of this?",
      "What did you learn from this?",
      "What would you do differently next time?",
    ];
    dispatch({
      assistantPrompts: fakePrompts,
    });
  };

  if (fetcher.data?.type === "error") {
    return (
      <div className="flex flex-col gap-2 bg-slate-300 p-4 dark:bg-slate-800">
        <Text variant="error">
          {Object.values(fetcher.data.errors).join(" ")}
        </Text>
      </div>
    );
  }

  if (fetcher.data?.type === "success") {
    return (
      <div className="flex flex-col gap-2 bg-slate-300 p-4 dark:bg-slate-800">
        <Text variant="success">{fetcher.data.message}</Text>
        <Text variant="subtitle">do another?</Text>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Yes
        </Button>
      </div>
    );
  }

  return (
    <>
      <fetcher.Form
        onChange={handleValidation}
        method="POST"
        className="flex flex-col"
        action="/prompts"
      >
        <PromptDisplay
          dispatch={dispatch}
          state={formState}
          className="flex gap-2 bg-slate-300 p-4 dark:bg-slate-800"
        />
        <PromptField
          onChange={(e) => {
            handleChange(e);
            handleAssistantPrompts();
          }}
          required
        ></PromptField>

        <input
          type="hidden"
          placeholder="date"
          name="creationDate"
          required
          value={new Date().toISOString().split("T")[0]}
        />
        {formState.assistantPrompts.map((prompt, index) => (
          <input
            key={index}
            type="hidden"
            name={`assistantPrompts[${index}]`}
            value={prompt}
          />
        ))}
        <div className="m-0 flex w-full justify-between gap-2 bg-slate-300 p-4 dark:bg-slate-800">
          <input
            className="w-32 border-2 border-slate-400 bg-slate-200 px-2 py-0.5 text-slate-800 focus:outline-none dark:border-slate-500 dark:bg-slate-600 dark:text-slate-100"
            type="text"
            pattern="[0-9]*"
            name="age"
            required
            onChange={handleChange}
            placeholder="age"
          />
          {formErrorMessages.length > 0 && (
            <Text variant="error">{formErrorMessages.join(" ")}</Text>
          )}
          <Button type="submit" value="Submit">
            <Text variant="button">Save Response</Text>
          </Button>
        </div>
      </fetcher.Form>
    </>
  );
};

export default PromptForm;
