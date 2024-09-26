import { createBrowserRouter, redirect } from "react-router-dom";
import * as React from "react";
import Prompts from "./Prompt/Prompts";
import Settings from "./Settings/Settings";
import Layout from "./Layout";
import getPrompt from "./Prompt/getPrompt";
import NotFound from "./NotFound";
import Timeline from "./Timeline/Timeline";
import { promptAction } from "./Prompt/promptAction";
import { getSubmissions } from "./Timeline/getSubmissions";
import Signup from "./Login/Signup";
import signupAction from "./Login/SignupAction";
import Home from "./Home/Home";

type RouteTitles = {
  [key: string]: string;
};

export const routeTitles = {
  "/": "Welcome to Savemypast",
  "/login": "Login",
  "/signup": "Signup",
  "/prompts": "Write your history...",
  "/settings": "Settings",
  "/timeline": "Timeline",
  "/404": "Page Not Found",
} as RouteTitles;

const fakeLoader = async () => {
  console.log("wow it loaded more than once");
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
    }, 50);
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
        path: "/prompts",
        Component: Prompts as React.FC,
        loader: import.meta.env.VITE_DEV ? fakeLoader : getPrompt,
        action: promptAction,
      },
      {
        path: "/signup",
        action: signupAction,
        Component: Signup as React.FC,
      },
      {
        path: "/timeline",
        loader: getSubmissions,
        Component: Timeline as React.FC,
      },
      {
        path: "/settings",
        Component: Settings as React.FC,
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
