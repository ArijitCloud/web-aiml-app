import { Reducer, useReducer } from "react";

const aimlReducer = (state: AIMLState, action: AIMLAction): AIMLState => {
  //   const { modelName } = state;
  const { type, payload } = action;

  switch (type) {
    case "init": {
      return {
        ...state,
        modelName: payload.modelName,
      };
    }
    case "promptUpdate": {
      return {
        ...state,
        prompts: [payload.newPrompt],
      };
    }
    case "resultReceived": {
      return {
        ...state,
        generatedText: payload.response,
      };
    }
    default:
      return state;
  }
};

const useAimlReducer = () => {
  const [state, dispatch] = useReducer<
    Reducer<AIMLState, AIMLAction>,
    undefined
  >(aimlReducer, undefined, () => ({
    modelName: "",
    prompts: [],
    generatedText: [],
  }));
  return { state, dispatch };
};

type AIMLState = {
  prompts: ReadonlyArray<string>;
  generatedText: string | ReadonlyArray<string>;
  modelName: string;
};

type AIMLAction = InitAIMLAction | ResultReceivedAction | PromptUpdateAction;

interface InitAIMLAction {
  readonly type: "init";
  readonly payload: {
    modelName: string;
  };
}

interface PromptUpdateAction {
  readonly type: "promptUpdate";
  readonly payload: {
    newPrompt: string;
  };
}

interface ResultReceivedAction {
  readonly type: "resultReceived";
  readonly payload: {
    response: string | ReadonlyArray<string>;
  };
}

export { useAimlReducer };
export type { AIMLState, AIMLAction, InitAIMLAction };
