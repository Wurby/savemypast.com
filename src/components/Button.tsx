import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "normal" | "icon";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  let baseClassName = " border-2 border-slate-400 dark:border-slate-500";

  switch (variant) {
    case "primary":
      baseClassName +=
        " px-4 py-0.5 text-slate-100 dark:text-slate-100 bg-teal-600 dark:bg-teal-400 hover:bg-teal-500 active:translate-y-px";
      break;
    case "secondary":
      baseClassName +=
        " px-4 py-0.5 text-teal-900 dark:text-teal-600 bg-slate-600 dark:bg-slate-400 hover:bg-slate-500 active:translate-y-px";
      break;
    case "icon":
      baseClassName +=
        " p-1 bg-slate-400 dark:bg-slate-600 text-slate-100 dark:text-slate-100 active:translate-y-px";
      break;
    default:
      baseClassName +=
        " px-4 py-0.5 bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 text-slate-100 hover:dark:bg-slate-700 active:translate-y-px";
      break;
  }

  const combinedClassName = `${baseClassName} ${className || ""}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
