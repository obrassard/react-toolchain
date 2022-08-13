import { useEffect, useMemo, useRef, useState } from "react";

export type UseResizeObserverRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;

export default function useResizeObserver(
  callback: (rect: UseResizeObserverRect) => void,
  triggerOnMount?: boolean
) {
  const [element, ref] = useState<HTMLElement | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver((entries: any) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } =
            entries[0].contentRect;
          callbackRef.current({
            x,
            y,
            width,
            height,
            top,
            left,
            bottom,
            right,
          });
        }
      }),
    []
  );

  useEffect(() => {
    if (!element) return;
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  useEffect(() => {
    if (triggerOnMount && element) {
      const { x, y, width, height, top, left, bottom, right } =
        element.getBoundingClientRect();
      callbackRef.current({ x, y, width, height, top, left, bottom, right });
    }
  }, [element, triggerOnMount]);

  return { ref, element };
}
