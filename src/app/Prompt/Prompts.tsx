import React from "react";
import PromptForm from "../../components/Prompt/PromptForm";

const Prompts: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <section className="flex w-3/6 flex-col gap-4">
          <PromptForm />
        </section>
      </div>
    </>
  );
};

export default Prompts;
