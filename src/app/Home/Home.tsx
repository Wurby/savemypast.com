import * as React from "react";
import Text from "../../components/Text";
import { useFetcher } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home: React.FC = () => {
  const fetcher = useFetcher();
  const fetcher2 = useFetcher();
  const fetcher3 = useFetcher();

  React.useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/prompts");
    }
    if (fetcher2.state === "idle" && !fetcher2.data) {
      fetcher2.load("/prompts");
    }
    if (fetcher3.state === "idle" && !fetcher3.data) {
      fetcher3.load("/prompts");
    }
  }, [fetcher, fetcher2, fetcher3]);

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
        <div className="w-2/6 border-2 border-slate-500 p-2">
          <Text>{fetcher.data ? fetcher.data : <LoadingSpinner />}</Text>
        </div>
        <div className="w-2/6 border-2 border-slate-500 p-2">
          <Text>{fetcher2.data ? fetcher2.data : <LoadingSpinner />}</Text>
        </div>
        <div className="w-2/6 border-2 border-slate-500 p-2">
          <Text>{fetcher3.data ? fetcher3.data : <LoadingSpinner />}</Text>
        </div>
      </section>
    </section>
  );
};

export default Home;
