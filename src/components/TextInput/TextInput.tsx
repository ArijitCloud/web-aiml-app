import { Ref, forwardRef } from "react";
import "./TextInput.css";

const TextInput = forwardRef(
  (
    { onTextChange, isDisabled }: TextInputProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        id="input"
        ref={ref}
        className="prompt-input"
        placeholder="start typing content to summarize..."
        rows={10}
        cols={90}
        maxLength={1000}
        disabled={isDisabled}
        onChange={(e) => onTextChange(e.target.value)}
      ></textarea>
    );
  }
);

interface TextInputProps {
  isDisabled: boolean;
  onTextChange: (value: string) => void;
}

export { TextInput };
