import * as React from "react";

interface PromptFieldProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const PromptField: React.FC<PromptFieldProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`"border placeholder:text-grey-200" min-h-96 w-full resize-none border-2 border-slate-300 bg-slate-200 px-3 py-2 focus:outline-none dark:border-slate-800 dark:bg-slate-700 dark:text-slate-100 ${className}`}
      {...props}
    />
  );
};

export default PromptField;
