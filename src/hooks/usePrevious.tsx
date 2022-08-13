import { useEffect, useRef } from "react";

/**
 * Returns the value a variable had during last time this function was called
 * Returns undefined at first
 */
export const usePrevious = <T>(value: T, useValueAsDefault?: boolean) => {
  const previousRef = useRef<T | undefined>(
    useValueAsDefault ? value : undefined
  );
  useEffect(() => {
    previousRef.current = value;
  });
  return previousRef.current;
};
