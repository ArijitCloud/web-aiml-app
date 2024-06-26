import "./App.css";
import { ComputingIndicator, OutputArea, TextInput } from "./components";
import { WorkerMessage } from "./types/WorkerMessage";
import { useDebouncedCallback } from "./common";
import { useAppWorker } from "./useAppWorker";
import React, { useEffect, useRef } from "react";
import { SubmitButton } from "./components/SubmitButton/SubmitButton";

function App() {
  const { state, dispatch, workerRef } = useAppWorker();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (state.prompts?.length > 0) {
      dispatch({ type: "startCompute", payload: undefined });
      const message: WorkerMessage = {
        type: "compute",
        payload: { inputText: state.prompts[0] },
      };
      workerRef.current?.postMessage(message);
      event.preventDefault(); //avoid triggering focus event on section
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
    <>
      <h2>Summarizer</h2>
      <main className="aiml-container">
        <section
          className="input-section"
          onClick={() => inputRef.current?.focus()}
        >
          <TextInput
            ref={inputRef}
            onTextChange={debouncedInputChange}
            isDisabled={state.isComputing}
          />
          <div className="input-footer">
            <label>{`${state.prompts?.[0]?.length ?? 0} / 1000`}</label>
            <SubmitButton onSubmit={onSubmit} isComputing={state.isComputing} />
          </div>
        </section>
        {state.hasSubmitted && (
          <section className="output-section">
            {state.isComputing ? (
              <ComputingIndicator />
            ) : state.errorMessage ? (
              <div>{state.errorMessage}</div>
            ) : (
              <OutputArea response={state.generatedText} />
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default App;
