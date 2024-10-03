import * as React from "react";
import Text from "../../components/Text";
import { useFetcher } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home: React.FC = () => {
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/prompts");
    }
  }, [fetcher]);

  return (
    <section className="mx-auto flex flex-col md:gap-4">
      <Text className="text-center" variant="caption">
        Start your journey...
      </Text>

      <Text className="bg-slate-300 px-16 py-4 dark:bg-slate-600">
        Savemypast is a personal history writing app that helps you write your
        life story, one prompt at a time. Our helpful ai assistant will guide
        you through the process of writing about your many different memories
        and experiences.
      </Text>

      <div className="max-w-3xl self-center border-2 border-slate-500">
        <img
          src="/savemypast.jpeg"
          alt="a woman using savemypast.com"
          className="w-full"
        />
        <Text variant="caption" className="pb-4 pt-4 text-center">
          as you write about your past you may unlock new memories that help you
          understand who you are.
        </Text>
      </div>

      <section className="flex max-w-4xl flex-col justify-between gap-8 self-center md:flex-row">
        <div className="flex flex-col gap-2 border-slate-500 p-2 md:mb-32 md:w-2/6 md:border-2">
          <Text variant="subtitle">Tailored to you</Text>
          <Text>
            Each prompt is unique and designed to help you remember and write
            about your past.
          </Text>
        </div>
        <div className="border-slate-500 shadow-sm shadow-slate-500 md:mt-32 md:w-2/6 md:border-2 md:shadow-none">
          <div className="-p-2 flex w-full bg-slate-300 dark:bg-slate-700">
            <Text variant="subtitle" className="p-2">
              Dynamically generated prompts!
            </Text>
          </div>
          {fetcher.data ? (
            <Text className="p-2">{fetcher.data}</Text>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <div className="flex flex-col gap-2 border-slate-500 p-2 md:mb-32 md:w-2/6 md:border-2">
          <Text variant="subtitle">Write how much you want</Text>
          <Text>
            You can write as much or as little as you want, and you can always
            come back to a prompt later and find it in your timeline!
          </Text>
        </div>
      </section>
    </section>
  );
};

export default Home;
