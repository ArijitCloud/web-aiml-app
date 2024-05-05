import "./OutputArea.css";
const OutputArea = ({ response }: OutputAreaProps) => {
  return (
    <textarea title="output" placeholder=""
      className="output-container"
      value={response}
      rows={25}
      cols={90}
      readOnly
    ></textarea>
  );
};

interface OutputAreaProps {
  readonly response: string | ReadonlyArray<string>;
}

export { OutputArea };
