// https://github.com/streamich/react-use/blob/master/src/useMeasure.ts

import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useResizeObserver from "./useResizeObserver";

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;
export type UseMeasureRef<E extends HTMLElement = HTMLElement> = (
  element: E
) => void;
export type UseMeasureResult<E extends HTMLElement = HTMLElement> = [
  UseMeasureRef<E>,
  UseMeasureRect
];

const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export const useMeasure = <
  E extends HTMLElement = HTMLElement
>(): UseMeasureResult<E> => {
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  // Borealis - Implemented 100ms debounce
  const setRectDebounced = useDebouncedCallback(
    useCallback((rekt: UseMeasureRect) => {
      setRect(rekt);
    }, []),
    100,
    {
      maxWait: 100,
    }
  );

  return [useResizeObserver(setRectDebounced).ref, rect];
};
