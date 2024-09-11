import * as React from "react";
import Text from "../Text";
import { useFetcher } from "react-router-dom";
import type { PromptForm } from "./PromptForm.d";
import Button from "../Button";

interface PromptDisplayProps {
  className?: string;
  dispatch: React.Dispatch<PromptForm>;
  state: PromptForm;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({
  className,
  state,
  dispatch,
}) => {
  const fetcher = useFetcher();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/api/getPrompt");
    }
  }, [fetcher]);

  React.useEffect(() => {
    if (fetcher.data) {
      dispatch({ ...state, prompt: fetcher.data });
      setLoading(false);
    }
  }, [fetcher.data, dispatch]);

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    fetcher.load("/api/getPrompt");
  };

  if (loading) {
    return (
      <section className={`${className}`}>
        <Text variant="subtitle">Loading prompt...</Text>
      </section>
    );
  }

  return (
    <>
      <section className={`${className}`}>
        <Text variant="subtitle">{fetcher.data}</Text>
        <section>
          <Button variant="icon" onClick={handleRefresh}>
            🔄
          </Button>
        </section>
      </section>
      <input type="hidden" name="prompt" value={fetcher.data} />
    </>
  );
};

export default PromptDisplay;
