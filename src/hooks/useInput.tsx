import { useState, ChangeEvent } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id, type } = event.target;
    if (name === "role") {
      setValue(id);
    } else if (type !== "file") {
      setValue(value);
    }
  };

  return {
    value,
    onChange: handleChange,
  };
};