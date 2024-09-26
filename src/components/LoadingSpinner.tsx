import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="m-auto flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-slate-500"></div>
    </div>
  );
};

export default LoadingSpinner;
