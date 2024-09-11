import React from "react";
import Text from "./Text";
import { NavLink } from "react-router-dom";

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, className, children }) => {
  const defaultStyles = " text-blue-500 hover:underline ";

  return (
    <NavLink to={href}>
      <Text
        variant="link"
        className={className ? className + " hover:underline" : defaultStyles}
      >
        {children}
      </Text>
    </NavLink>
  );
};

export default Link;
