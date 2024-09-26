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
          "You are a helpful prompter that prompts the user with a single writing prompt about different and specific memories from their past as a way for them to incrementally write a personal history.",
      },
      {
        role: "system",
        content:
          "Be specific in your prompts about an exact period of time, event, or memory. This will help the user to recall specific details and write more detailed responses.",
      },
      {
        role: "system",
        content:
          "Topics you can prompt the user on are as follows: childhood, adolescence, adulthood, family, friends, school, work, hobbies, interests, trauma, adversity, achievements, marriage, dating, children, travel, love and relationships, and personal growth.",
      },
      {
        role: "system",
        content:
          "Do not limit yourself to childhood or adolescent memories, the user may have memories from any period of their life that they would like to write about.",
      },
    ],
  });

  return completion.choices[0].message.content;
};

export default getPrompt;
