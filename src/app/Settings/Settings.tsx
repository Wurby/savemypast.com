import React from "react";
import useSetTheme from "../../hooks/useSetTheme";
import Button from "../../components/Button";
import Text from "../../components/Text";

const Settings: React.FC = () => {
  const { theme, toggleTheme, resetTheme } = useSetTheme();

  return (
    <section className="flex flex-wrap gap-2">
      <Text className="flex-1">Current Theme: {theme}</Text>
      <Button onClick={toggleTheme}>
        <Text>Toggle Theme</Text>
      </Button>
      <Button onClick={resetTheme}>
        <Text>System Theme</Text>
      </Button>
    </section>
  );
};

export default Settings;
