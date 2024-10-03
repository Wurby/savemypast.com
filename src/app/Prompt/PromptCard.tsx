import * as React from "react";
import Text from "../../components/Text";
import { PromptForm } from "./PromptForm.d";

const PromptCard: React.FC<PromptForm> = (prompt: PromptForm) => {
  return (
    <div className="flex flex-wrap justify-center border-2 border-slate-500">
      <div className="flex w-full justify-between bg-slate-300 px-4 dark:bg-slate-700">
        <Text className="p-2" variant="title">
          Added: {prompt.creationDate}
        </Text>
        <Text className="p-2" variant="title">
          Your age: {prompt.age}
        </Text>
      </div>
      <Text
        className="w-full bg-slate-200 p-4 dark:bg-slate-800"
        variant="label"
      >
        {prompt.prompt}
      </Text>
      <div className="w-full px-4 pb-2">
        <Text className="place-self-start">{prompt.promptResponse}</Text>
      </div>
    </div>
  );
};

export default PromptCard;
