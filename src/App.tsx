import "./App.css";
import { OutputArea, TextInput } from "./components";
import { WorkerMessage } from "./types/WorkerMessage";
import { useDebouncedCallback } from "./common";
import { useAppWorker } from "./useAppWorker";

function App() {
  const { state, dispatch, workerRef } = useAppWorker();

  const onSubmit = async () => {
    if (state.prompts?.length > 0) {
      const message: WorkerMessage = {
        type: "compute",
        payload: { inputText: state.prompts[0] },
      };
      workerRef.current?.postMessage(message);
    }
  };

  const debouncedInputChange = useDebouncedCallback((value: string) => {
    dispatch({
      type: "promptUpdate",
      payload: {
        newPrompt: value,
      },
    });
  }, 1000);

  return (
    <main className="aiml-container">
      <section className="input-section">
        <TextInput onTextChange={debouncedInputChange} />
        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </section>
      <section>
        <OutputArea response={state.generatedText} />
      </section>
    </main>
  );
}

export default App;
