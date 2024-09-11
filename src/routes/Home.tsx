import React from "react";
import Text from "../components/Text";
import PromptForm from "../components/Prompt/PromptForm";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <section className="flex w-3/6 flex-col gap-4">
          <Text className="self-center" variant="subtitle">
            Start your history...
          </Text>
          <PromptForm />
        </section>
      </div>
    </>
  );
};

export default Home;
