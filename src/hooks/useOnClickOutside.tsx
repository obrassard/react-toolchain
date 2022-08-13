import { MutableRefObject, RefObject } from "react";

import { useEventListener } from "./useEventListener";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  activated = true,
  handler: Handler,
  ...refs: (RefObject<T | undefined> | MutableRefObject<T | undefined>)[]
): void {
  useEventListener(
    "mousedown",
    (event) => {
      const target = event.target as Node;
      if (refs.every((ref) => !ref.current || !ref.current.contains(target))) {
        handler(event);
      }
    },
    undefined,
    activated
  );
}
