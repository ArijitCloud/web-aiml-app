import { Reducer, useEffect, useReducer } from "react";
import "./App.css";
import { AIMLAction, AIMLState, aimlReducer, initTransformers } from "./common";
import { OutputArea, TextInput } from "./components";

import { SummarizationOutput } from "@xenova/transformers";

function flattenOneLevel<T>(value: T | Array<T>) {
  return Array.isArray(value) ? value.flat() : (value as T);
}

const summarize = async (inputText: string) => {
  console.log(inputText);
  const summarizer = await initTransformers(
    "summarization",
    "Xenova/distilbart-cnn-6-6"
  );
  console.log("before summarized");
  const t1 = performance.now();
  const data = await summarizer(inputText);
  const t2 = performance.now();
  console.log("Time elapsed::", (t2 - t1).toString());

  return data;
};

function App() {
  // const [prompt, setPrompt] = useState<string>();
  // const [output, setOutput] = useState<string>();

  // const chatModuleRef = useRef<ChatModule | null>(null);

  const [state, dispatch] = useReducer<
    Reducer<AIMLState, AIMLAction>,
    undefined
  >(aimlReducer, undefined, () => ({
    modelName: "",
    prompts: [],
    generatedText: [],
  }));

  useEffect(() => {
    // if (!chatModuleRef.current) {
    //   setOutput("LLM init started, please wait...");
    //   const chat = new ChatModule();

    //   chat.setInitProgressCallback((report: InitProgressReport) => {
    //     console.log(report.progress * 100 + "%");
    //     // setOutput("initialization progress: " + report.progress * 100 + "%");
    //   });

    //   const modelName = import.meta.env.MODEL_NAME;
    //   if(!modelName) return;
    //   chat.reload(modelName).then(() => {
    //     console.log("%cLLM Ready!", "color: green", modelName);
    //     setOutput("LLM Ready!");
    //     chatModuleRef.current = chat;
    //   });
    // }

    () => {
      //cleanup
    };
  }, []);

  const onSubmit = async () => {
    if (state.prompts?.length > 0) {
      summarize(state.prompts[0])?.then((value) => {
        const responseText = flattenOneLevel<SummarizationOutput>(value)
          .map((v) => v.summary_text)
          .join("::##::");

        dispatch({
          type: "resultReceived",
          payload: {
            response: responseText,
          },
        });
      });
    }
  };

  // const debouncedSummarizer = useCallback(debounce(summarize, 0), []);

  const onInputChange = (value: string) => {
    dispatch({
      type: "promptUpdate",
      payload: {
        newPrompt: value,
      },
    });
  };

  return (
    <main className="aiml-container">
      <section className="input-section">
        <TextInput onTextChange={onInputChange} />
        <button type="submit" onClick={onSubmit}>Submit</button>
      </section>
      <section>
        <OutputArea response={state.generatedText} />
      </section>
    </main>
  );
}

export default App;
