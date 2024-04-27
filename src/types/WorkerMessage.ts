export type WorkerMessage = {
  type: "compute";
  payload: {
    inputText: string;
  };
};
