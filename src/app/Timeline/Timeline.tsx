import * as React from "react";
import { useFetcher } from "react-router-dom";
import type PromptForm from "../Prompt/PromptForm";
import PromptCard from "../Prompt/PromptCard";
import Text from "../../components/Text";
import Button from "../../components/Button";

const filterByAge = (promptResponses: PromptForm[]) => {
  return promptResponses.sort((a, b) => a.age - b.age);
};

const filterByDate = (promptResponses: PromptForm[]) => {
  return promptResponses.sort((a, b) => {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);
    return dateA.getTime() - dateB.getTime();
  });
};

const Timeline: React.FC = () => {
  const fetcher = useFetcher();
  const [prompts, setPrompts] = React.useState<PromptForm[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/prompts/timeline");
    }
  }, [fetcher]);

  React.useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as PromptForm[];
      setPrompts(data);

      setLoading(false);
    }
  }, [fetcher.data, setPrompts]);

  const handleFilter = (type: "age" | "date") => {
    const sortOrder = type;
    if (sortOrder === "age") {
      setPrompts(filterByAge([...prompts]));
    } else if (sortOrder === "date") {
      setPrompts(filterByDate([...prompts]));
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <section className="dark:bg-slate-80 flex w-4/6 items-center justify-end gap-2">
        <Text className="mr-2">Sort by:</Text>
        <Button onClick={() => handleFilter("age")}>Age</Button>
        <Button onClick={() => handleFilter("date")}>Date</Button>
      </section>
      {loading ? (
        <p>Loading Submissions...</p>
      ) : (
        <div className="flex w-4/6 justify-center">
          <section className="flex w-full flex-col gap-4">
            {prompts.map((prompt, index) => (
              <PromptCard key={index} {...prompt} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
export default Timeline;
