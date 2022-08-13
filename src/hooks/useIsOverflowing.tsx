import { RefObject, useLayoutEffect, useState } from "react";

export function isOverflowing<T extends HTMLElement>(element: T) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

export function useIsOverflowing<T extends HTMLElement>(ref: RefObject<T>) {
  const [hasOverflow, setHasOverflow] = useState<boolean | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      setHasOverflow(isOverflowing(current));
    }
  }, [ref]);

  return hasOverflow;
}
