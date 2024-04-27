import { SummarizationPipeline, initTransformers } from "./common";
import { WorkerMessage } from "./types/WorkerMessage";

let summarizerInstance: SummarizationPipeline;
const createSummarizerInstance = async () => {
  return (
    summarizerInstance ??
    (await initTransformers("summarization", "Xenova/distilbart-cnn-6-6"))
  );
};

self.onmessage = async (event: MessageEvent<unknown>) => {
  const summarizer = await createSummarizerInstance();
  const { type, payload } = event.data as WorkerMessage;
  switch (type) {
    case "compute": {
      const data = await summarizer(payload.inputText);  
      self.postMessage(data);
      break;
    }
    default:
    //donothing for now
  }
};
