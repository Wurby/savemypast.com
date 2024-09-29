import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { ActionFunctionArgs } from "react-router-dom";
import { auth } from "../../firebase/firebase";

export type AuthActionReturnTypes = "success" | "error";

export type AuthActionReturn = {
  user: UserCredential | null;
  type: AuthActionReturnTypes;
  errors: string[];
};

export const signupAction = async ({
  request,
}: ActionFunctionArgs): Promise<AuthActionReturn> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const email = data.email as string;
  const password = data.password as string;
  const errors = [] as string[];

  const firebaseErrorCodes = {
    "auth/email-already-in-use": "Email address is already in use",
    "auth/invalid-email": "Invalid email address",
  };

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

  const user = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorMessage =
      firebaseErrorCodes[error.code as keyof typeof firebaseErrorCodes];
    console.error(error);
    errors.push(errorMessage ? errorMessage : "An unknown error occurred");
  });

  return {
    user: user ? user : null,
    type: user ? "success" : "error",
    errors,
  };
};

export default signupAction;
