const OutputArea = ({ response }: OutputAreaProps) => {
  return (
    <div className="output-container">
      <textarea value={response} rows={50} cols={100} readOnly></textarea>
    </div>
  );
};

interface OutputAreaProps {
  readonly response: string | ReadonlyArray<string>;
}

export { OutputArea };
