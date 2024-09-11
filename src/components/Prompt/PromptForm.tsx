import * as React from "react";
import { Form } from "react-router-dom";
import PromptField from "./PromptField";
import PromptDisplay from "./PromptDisplay";
import type { PromptForm } from "./PromptForm.d";
import Button from "../Button";
import Text from "../Text";

const PromptForm: React.FC = () => {
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

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ age: parseInt(e.target.value) });
  };

  const handlePromptResponseChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({ promptResponse: e.target.value });
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

  return (
    <>
      <Form
        onChange={handleValidation}
        className="flex flex-col"
        action="/api/submitPromptResponse"
      >
        <PromptDisplay
          dispatch={dispatch}
          state={formState}
          className="flex gap-2 bg-slate-300 p-4 dark:bg-slate-800"
        />
        <PromptField
          onChange={handlePromptResponseChange}
          required
        ></PromptField>

        <input
          type="hidden"
          placeholder="date"
          name="creationDate"
          required
          value={new Date().toISOString().split("T")[0]}
        />
        <div className="m-0 flex w-full justify-between gap-2 bg-slate-300 p-4 dark:bg-slate-800">
          <input
            className="w-32 border-2 border-slate-400 bg-slate-200 px-2 py-0.5 text-slate-800 focus:outline-none dark:border-slate-500 dark:bg-slate-600 dark:text-slate-100"
            type="text"
            pattern="[0-9]*"
            name="age"
            required
            onChange={handleAgeChange}
            placeholder="age"
          />
          {formErrorMessages.length > 0 && (
            <Text variant="error">{formErrorMessages.join(" ")}</Text>
          )}
          <Button type="submit" value="Submit">
            <Text variant="button">Save Response</Text>
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PromptForm;
