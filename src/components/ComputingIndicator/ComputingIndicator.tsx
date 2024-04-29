import "./ComputingIndicator.css";
const ComputingIndicator = () => {
  return (
    <div className="loading-container">
      Thinking in AI...
      <img src="/loading.gif" alt="loading" height={200} width={200}></img>
    </div>
  );
};

export { ComputingIndicator };
