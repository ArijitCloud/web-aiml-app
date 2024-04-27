import { debounce } from "lodash";
import { useEffect, useRef } from "react";

/**
 * Returns debounced version of the callback function
 * @param callbackFunc Input function that you want to debounce
 * @param interval Number of miliseconds the callbackFunc must wait before being called
 * @returns Debounced `callbackFunc` function. 
 */
const useDebouncedCallback = (
  callbackFunc: (value: string) => void,
  interval: number
) => {
  const debouncedFunc = useRef(debounce(callbackFunc, interval));

  useEffect(() => {
    const currentDebouncedFunc = debouncedFunc.current;
    return () => {
      currentDebouncedFunc?.cancel();
    };
  }, []);

  return debouncedFunc.current;
};

export { useDebouncedCallback };
