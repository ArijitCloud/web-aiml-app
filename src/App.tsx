import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ChatModule, InitProgressReport } from "@mlc-ai/web-llm";

function App() {
  const [prompt, setPrompt] = useState<string>();
  const [output, setOutput] = useState<string>();

  const chatModuleRef = useRef<ChatModule | null>(null);

  useEffect(() => {
    if (!chatModuleRef.current) {
      setOutput("LLM init started, please wait...");
      const chat = new ChatModule();

      chat.setInitProgressCallback((report: InitProgressReport) => {
        console.log(report.progress * 100 + "%");
        // setOutput("initialization progress: " + report.progress * 100 + "%");
      });

      const modelName = import.meta.env.MODEL_NAME;
      if(!modelName) return;
      chat.reload(modelName).then(() => {
        console.log("%cLLM Ready!", "color: green", modelName);
        setOutput("LLM Ready!");
        chatModuleRef.current = chat;
      });
    }

    () => {
      //cleanup
      
    };
  }, []);

  const onGenerate = async () => {
    prompt &&
      chatModuleRef.current?.generate(prompt).then((generated) => {
        setOutput(generated);
      });
  };

  return (
    <main>
      <section>
        <textarea
          id="input"
          rows={10}
          cols={100}
          disabled={!chatModuleRef.current}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={onGenerate}>generate</button>
      </section>
      <section>
        <div id="output">{output}</div>
      </section>
    </main>
  );
}

export default App;
