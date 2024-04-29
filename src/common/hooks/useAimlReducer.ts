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
    case "startCompute": {
      return {
        ...state,
        isComputing: true,
        hasSubmitted:true,
        generatedText: [],
        errorMessage: undefined,
      };
    }
    case "resultReceived": {
      return {
        ...state,
        generatedText: payload.response,
        isComputing: false,
      };
    }
    case "errorReceived": {
      return {
        ...state,
        errorMessage: payload.errorMessage,
        isComputing: false,
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
    isComputing: false,
  }));
  return { state, dispatch };
};

type AIMLState = {
  prompts: ReadonlyArray<string>;
  generatedText: string | ReadonlyArray<string>;
  modelName: string;
  isComputing: boolean;
  hasSubmitted?: boolean;
  errorMessage?: string;
};

type AIMLAction =
  | InitAIMLAction
  | ResultReceivedAction
  | PromptUpdateAction
  | StartComputeAction
  | ErrorReceivedAction;

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

interface StartComputeAction {
  readonly type: "startCompute";
  readonly payload: undefined;
}

interface ErrorReceivedAction {
  readonly type: "errorReceived";
  readonly payload: {
    errorMessage: string;
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
