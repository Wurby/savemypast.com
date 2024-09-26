import React from "react";

type DividerProps = {
  className?: string;
};

const HorizontalDivider: React.FC<DividerProps> = ({
  className,
}: DividerProps) => {
  return (
    <div
      className={
        "mb-6 mt-1 h-[1px] w-4/5 self-center bg-slate-500 " + className
      }
    >
      <div className="h-full w-full bg-slate-500 blur-sm"></div>
    </div>
  );
};

const VerticalDivider: React.FC<DividerProps> = ({
  className,
}: DividerProps) => {
  return (
    <div
      className={
        "min-h-2/3 mx-1 h-6 w-[1px] self-center bg-slate-500 " + className
      }
    >
      <div className="h-full w-full bg-slate-500 blur-sm"></div>
    </div>
  );
};

export { HorizontalDivider, VerticalDivider };
