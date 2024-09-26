import * as React from "react";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "title"
    | "subtitle"
    | "caption"
    | "button"
    | "label"
    | "link"
    | "error"
    | "success";
  htmlProps?: React.HTMLProps<HTMLParagraphElement>;
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  variant,
  htmlProps,
}) => {
  let style = className ? className + " " : " ";
  switch (variant) {
    case "title":
      style += "text-4xl font-thin dark:text-slate-100 ";
      break;
    case "subtitle":
      style += "text-2xl font-thin dark:text-slate-100 ";
      break;
    case "caption":
      style += "text-sm font-light dark:text-slate-100 ";
      break;
    case "error":
      style += "text-base text-pink-500 dark:text-pink-300 ";
      break;
    case "success":
      style += "text-base text-teal-500 dark:text-teal-300 ";
      break;
    case "link":
      style += "text-base hover:underline dark:text-slate-100 ";
      break;
    default:
      style += "text-base font-light dark:text-slate-100 ";
      break;
  }

  return (
    <p className={style} {...htmlProps}>
      {children}
    </p>
  );
};

export const Label = ({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-base font-light dark:text-slate-100 ${className}`}
    >
      {children}
    </label>
  );
};

export default Text;
