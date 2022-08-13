import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useOnWindowResize(
  isActive: boolean,
  onResize: () => void,
  debouncedDelay = 100
) {
  const debouncedResize = useDebouncedCallback(() => {
    onResize();
  }, debouncedDelay);

  useEffect(() => {
    if (isActive) {
      window.addEventListener("resize", debouncedResize);
    }
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [debouncedResize, isActive]);
}
