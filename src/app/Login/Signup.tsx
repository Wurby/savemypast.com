import * as React from "react";
import Button from "../../components/Button";
import Text, { Label } from "../../components/Text";
import { useFetcher, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
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

  console.log(fetcher.data);

  if (fetcher.data?.type === "error") {
    return (
      <section className="flex w-full flex-col items-center justify-center">
        <Text variant="title">An error occurred while signing up</Text>
        <Text variant="error">{fetcher.data.errors.join(",")}</Text>
      </section>
    );
  }

  if (fetcher.data?.type === "success") {
    return (
      <section className="flex w-full flex-wrap justify-center">
        <Text className="w-full text-center" variant="success">
          Signed up successfully!
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
      action="/signup"
      className="flex h-full w-full flex-col items-center justify-center gap-2"
    >
      <div className="flex w-3/6 flex-col justify-center">
        <Label className="flex items-center justify-between" htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-slate-300 bg-slate-200 px-3 py-2 focus:outline-none dark:border-slate-800 dark:bg-slate-700 dark:text-slate-100"
          />
        </Label>
        <Label className="flex items-center justify-between" htmlFor="email">
          Password
          <input
            type="password"
            name="password"
            required
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
      <Button disabled={errors.length > 0} className="mt-2">
        Sign Up
      </Button>
    </fetcher.Form>
  );
};

export default Signup;
