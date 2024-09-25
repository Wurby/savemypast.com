import { ActionFunctionArgs } from "react-router-dom";

interface PromptForm {
  prompt: string;
  promptResponse: string;
  age: number;
  creationDate: string;
  assistantPrompts: string[];
}

type ActionReturn = {
  type: "error" | "success";
  message?: string;
  errors?: Errors;
};

type Errors = {
  [key: string]: string;
};

export const promptAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data: { [key: string]: FormDataEntryValue } = Object.fromEntries(
    formData.entries()
  );

  const errors: Errors = {};

  // Perform validation and populate errors object
  if (!data.prompt) {
    errors.prompt =
      "The server has had an error with your submission. If this continues, please contact us.";
  }
  if (!data.promptResponse) {
    errors.promptResponse = "Prompt response is required.";
  }
  if (!data.age) {
    errors.age = "Age is required.";
  }
  if (!data.creationDate) {
    errors.creationDate =
      "The server has had an error with your submission. If this continues, please contact us.";
  }

  if (Object.keys(errors).length > 0) {
    const errorResponse: ActionReturn = {
      type: "error",
      errors,
    };
    return errorResponse;
  }

  // Collect assistantPrompts from formData
  const assistantPrompts: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("assistantPrompts[")) {
      assistantPrompts.push(value as string);
    }
  }

  // Manually map the form data to the PromptForm type
  const promptForm: PromptForm = {
    prompt: data.prompt as string,
    promptResponse: data.promptResponse as string,
    age: parseInt(data.age as string, 10),
    creationDate: data.creationDate as string,
    assistantPrompts,
  };

  // Store in localStorage
  const submissions = JSON.parse(
    localStorage.getItem("promptSubmissions") || "[]"
  );
  localStorage.setItem(
    "promptSubmissions",
    JSON.stringify([...submissions, promptForm])
  );

  return {
    type: "success",
    message: "Response saved successfully!",
  };
};
