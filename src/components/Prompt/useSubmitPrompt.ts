import { useState, useEffect } from "react";
import type { PromptForm } from "./PromptForm.d";

type UseSubmitPromptReturn = {
  submitPrompt: (submission: PromptForm) => void;
  submissions: PromptForm[];
  loading: boolean;
  error: string | null;
};

const useSubmitPrompt = (): UseSubmitPromptReturn => {
  const [submissions, setSubmissions] = useState<PromptForm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubmissions = () => {
      try {
        const storedSubmissions = localStorage.getItem("promptSubmissions");
        if (storedSubmissions) {
          setSubmissions(JSON.parse(storedSubmissions));
        }
      } catch (error) {
        console.error("Error loading submissions from storage: ", error);
        setError("Failed to load submissions from storage.");
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  const submitPrompt = (submission: PromptForm) => {
    try {
      setSubmissions((prevSubmissions) => {
        const updatedSubmissions = [...prevSubmissions, submission];
        localStorage.setItem(
          "promptSubmissions",
          JSON.stringify(updatedSubmissions)
        );
        return updatedSubmissions;
      });
    } catch (error) {
      console.error("Error saving submission: ", error);
      setError("Failed to save submission.");
    }
  };

  return { submitPrompt, submissions, loading, error };
};

export default useSubmitPrompt;
