import './TextInput.css';

//TODO move focus to parent and change outline style on focus
const TextInput = ({ onTextChange }: TextInputProps) => {
  return (
    <textarea
      id="input"
      className="prompt-input"
      placeholder="start typing..."
      rows={10}
      cols={90}
      // disabled={!chatModuleRef.current}
      onChange={(e) => onTextChange(e.target.value)}
    ></textarea>
  );
};

interface TextInputProps {
  onTextChange: (value: string) => void;
}

export { TextInput };
