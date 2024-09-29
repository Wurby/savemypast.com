import * as React from "react";
import { ActionFunctionArgs, useFetcher, useNavigate } from "react-router-dom";
import { AuthActionReturn } from "./SignupAction";
import Text, { Label } from "../../components/Text";
import Button from "../../components/Button";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginAction = async ({
  request,
}: ActionFunctionArgs): Promise<AuthActionReturn> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const email = data.email as string;
  const password = data.password as string;
  const errors = [] as string[];

  const emailValidation = email.includes("@");
  const passwordValidation = password.length >= 6;

  if (!emailValidation) {
    errors.push("Invalid email address");
  }

  if (!passwordValidation) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    return {
      user: null,
      type: "error",
      errors,
    };
  }

  const user = await signInWithEmailAndPassword(auth, email, password).catch(
    (error) => {
      console.error(error);
      errors.push("An unknown error occurred");
    }
  );

  return {
    user: user ? user : null,
    type: user ? "success" : "error",
    errors,
  };
};

const Login = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const validate = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const newErrors = [];

    if (name === "email" && !value.includes("@")) {
      newErrors.push("Invalid email address");
    }

    if (name === "password" && value.length < 6) {
      newErrors.push("Password must be at least 6 characters");
    }

    setErrors(newErrors);
  };

  if (fetcher.data?.type === "error") {
    return (
      <section className="flex w-full flex-col items-center justify-center">
        <Text variant="title">An error occurred while signing in</Text>
        <Text variant="error">{fetcher.data.errors.join(",")}</Text>
      </section>
    );
  }

  if (fetcher.data?.type === "success") {
    return (
      <section className="flex w-full flex-wrap justify-center">
        <Text className="w-full text-center" variant="success">
          Signed in successfully!
        </Text>
        <Button onClick={() => navigate("/prompts")} className="mt-2">
          Get started!
        </Button>
      </section>
    );
  }

  return (
    <fetcher.Form
      onChange={validate}
      method="POST"
      action="/login"
      className="flex h-full w-full flex-col items-center justify-center gap-2"
    >
      <div className="flex w-3/6 max-w-xl flex-col justify-center gap-4">
        <Label className="flex items-center justify-between" htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="John@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-slate-300 bg-slate-200 px-3 py-2 focus:outline-none dark:border-slate-800 dark:bg-slate-700 dark:text-slate-100"
          />
        </Label>
        <Label className="flex items-center justify-between" htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-slate-300 bg-slate-200 px-3 py-2 focus:outline-none dark:border-slate-800 dark:bg-slate-700 dark:text-slate-100"
          />
        </Label>
        {errors.map((error) => (
          <Text variant="error" key={error}>
            {error}
          </Text>
        ))}
      </div>
      <Button type="submit" className="mt-2">
        Login
      </Button>
    </fetcher.Form>
  );
};

export default Login;
