import { createBrowserRouter, redirect } from "react-router-dom";
import * as React from "react";
import Home from "./Home";
import Settings from "./Settings";
import Layout from "./Layout";
import getPrompt from "./getPrompt";
import NotFound from "./NotFound";

const fakeLoader = async () => {
  // Fake loader to simulate the getPrompt function, returns a fake prompt after a delay of 2 seconds...
  const garbage = await new Promise<string>((resolve) => {
    const fakePrompts = [
      "A garbage prompt that is really bad and is also really long and takes up a lot of space and is really boring and is also really bad and is also really long and is also really bad and is also really long",
      "A fake prompt that is really long and takes up a lot of space and is really boring and is also really bad and is also really long",
      "A super fake prompt that takes about two seconds to load, and I have it really long so that I can simulate a real prompt, but this is just trash so I don't use the openAI api too much and cost money lol",
    ];

    setTimeout(() => {
      resolve(
        "Dev environment detected, " +
          fakePrompts[Math.floor(Math.random() * fakePrompts.length)]
      );
    }, 2000);
  });

  return garbage;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        Component: Home as React.FC,
      },
      {
        path: "/settings",
        Component: Settings as React.FC,
      },
      {
        path: "/api/getPrompt",
        loader: import.meta.env.VITE_DEV ? fakeLoader : getPrompt,
      },
      // not found route
      {
        path: "/*",
        loader: async () => redirect("/404"),
      },
      {
        path: "/404",
        Component: NotFound as React.FC,
      },
    ],
  },
]);

export default router;
