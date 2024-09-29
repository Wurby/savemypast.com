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
    <section className="mx-auto flex flex-col gap-8">
      <Text className="text-center" variant="caption">
        Start your journey...
      </Text>

      <Text className="bg-slate-300 px-16 py-4 dark:bg-slate-600">
        Savemypast is a personal history writing app that helps you write your
        life story, one prompt at a time. Our helpful ai assistant will guide
        you through the process of writing about your many different memories
        and experiences.
      </Text>

      <div className="max-w-3xl self-center border-2 border-slate-500 p-2">
        <img
          src="/savemypast.jpeg"
          alt="a woman using savemypast.com"
          className="w-full"
        />
        <Text variant="caption" className="pb-2 pt-4 text-center">
          as you write about your past you may unlock new memories that help you
          understand who you are.
        </Text>
      </div>

      <section className="flex max-w-4xl justify-between gap-8 self-center">
        <div className="mb-32 w-2/6 border-2 border-slate-500 p-2">
          <Text>
            Each prompt is unique and designed to help you remember and write
            about your past.
          </Text>
        </div>
        <div className="mt-32 w-2/6 border-2 border-slate-500 p-2">
          {fetcher.data ? <Text>{fetcher.data}</Text> : <LoadingSpinner />}
        </div>
        <div className="mb-32 w-2/6 border-2 border-slate-500 p-2">
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
