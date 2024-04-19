import { SummarizationPipeline, pipeline } from "@xenova/transformers";

const initTransformers = async <T extends AllPipelines>(
  pipelineType: T,
  modelName: TransformersModelName<T>
): Promise<TransformersPipeline<T>> => {
  return await pipeline(pipelineType, modelName);
};

type AllPipelines = "summarization";
type TransformersPipeline<T> = T extends "summarization"
  ? SummarizationPipeline
  : unknown;
type TransformersModelName<T> = T extends "summarization"
  ? SummaryModelName
  : unknown;
type SummaryModelName = "Xenova/distilbart-cnn-6-6" | "Xenova/bart-large-cnn";

export { initTransformers };
export type {
  AllPipelines,
  SummaryModelName,
  SummarizationPipeline,
  TransformersModelName,
  TransformersPipeline,
};
