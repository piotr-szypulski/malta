import { useState } from "react";

export default function useInputChange(state) {
  const [input, setInput] = useState(state);

  const handleInputChange = e => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  });

  return [input, handleInputChange];
}
