import { useCallback, useEffect, useRef } from "react";
import { flattenTransformerResponseOneLevel, useAimlReducer } from "./common";
import { SummarizationOutput } from "@xenova/transformers";

const flattenSummarization = (
  value: SummarizationOutput | SummarizationOutput[]
) =>
  flattenTransformerResponseOneLevel<SummarizationOutput>(value)
    .map((v) => v.summary_text)
    .join("::##::");

const useAppWorker = () => {
  const { state, dispatch } = useAimlReducer();

  const workerRef = useRef<Worker | null>(null);
  const processSummaryOutput = useCallback(
    (value: SummarizationOutput | SummarizationOutput[]) => {
      const responseText = flattenSummarization(value);
      dispatch({
        type: "resultReceived",
        payload: {
          response: responseText,
        },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("./App.worker.ts", import.meta.url),
        { type: "module" }
      );
    }

    workerRef.current.onmessage = (event) => {
      if (event.data.result) {
        processSummaryOutput(event.data.result);
      } else {
        const error = event.data.error;
        dispatch({
          type: "errorReceived",
          payload: { errorMessage: `${error?.name}: ${error?.message}` },
        });
      }
    };

    () => {
      if (workerRef.current) {
        workerRef.current.onmessage = null;
        workerRef.current.terminate();
      }
    };
  }, [processSummaryOutput]);

  return { state, dispatch, workerRef };
};

export { useAppWorker };
