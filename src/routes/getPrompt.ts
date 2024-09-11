import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_PROMPT_ASSISTANT_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getPrompt = async () => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful personal history writing prompter that provides prompts the user with a single prompt to write about different and specific memories as a way for them to incrementally build a personal history.",
      },
      {
        role: "system",
        content:
          "Be specific in your prompts about an exact period of time, event, or memory. This will help the user to recall specific details and write more detailed responses.",
      },
      {
        role: "system",
        content:
          "Example prompts include: 'When you were a child, what was school like? Did you have a favorite subject?', 'What was your first job and where was it? How old were you?', 'Did you attend college? Where did you attend or why didn't you attend? What was your major? or what would it have been?'",
      },
    ],
  });

  return completion.choices[0].message.content;
};

export default getPrompt;
