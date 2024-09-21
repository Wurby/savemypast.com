import { PromptForm } from "../components/Prompt/PromptForm.d";

export const getSubmissions = async (): Promise<PromptForm[]> => {
  const submissions = await localStorage.getItem("promptSubmissions");
  if (submissions) {
    return JSON.parse(submissions);
  }
  return [
    {
      prompt: "No prompts found.",
      promptResponse: "No responses found.",
      creationDate: "No date found.",
      age: -1,
      assistantPrompts: [],
    },
  ];
};
