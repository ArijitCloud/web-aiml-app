import "./SubmitButton.css";

type SubmitButtonProps = {
  readonly onSubmit: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => Promise<void>;
  readonly isComputing?: boolean;
};
const SubmitButton = ({ onSubmit, isComputing }: SubmitButtonProps) => {
  return (
    <button type="submit" onClick={onSubmit} disabled={isComputing} title="submit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="submit-icon"
      >
        <path d="M5.694 12 2.299 3.27c-.236-.607.356-1.188.942-.981l.093.039 18 9a.75.75 0 0 1 .097 1.284l-.097.058-18 9c-.583.291-1.217-.245-1.065-.848l.03-.095L5.694 12 2.299 3.27 5.694 12ZM4.402 4.54l2.61 6.71h6.627a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.649.743l-.101.007H7.01l-2.609 6.71L19.322 12 4.401 4.54Z"></path>
      </svg>
    </button>
  );
};

export { SubmitButton };
export type { SubmitButtonProps };
