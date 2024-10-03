import React from "react";
import PromptForm from "./PromptForm";

const Prompts: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <section className="flex flex-col gap-4 md:w-3/6">
          <PromptForm />
        </section>
      </div>
    </>
  );
};

export default Prompts;
