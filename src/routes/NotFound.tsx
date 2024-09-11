import React from "react";
import Text from "../components/Text";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Text
        variant="title"
        className="m-auto bg-slate-200 p-48 text-center dark:bg-slate-800"
      >
        Page Not Found
      </Text>
    </div>
  );
};

export default NotFound;
