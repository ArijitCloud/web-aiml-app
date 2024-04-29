import "./OutputArea.css";
const OutputArea = ({ response }: OutputAreaProps) => {
  return (
    <textarea
      className="output-container"
      value={response}
      rows={25}
      cols={100}
      readOnly
    ></textarea>
  );
};

interface OutputAreaProps {
  readonly response: string | ReadonlyArray<string>;
}

export { OutputArea };
