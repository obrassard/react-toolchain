import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useIsScrolled() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const setScrolledDebounce = useDebouncedCallback(() => {
    setIsScrolled(window.pageYOffset > 0);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", setScrolledDebounce);
    return () => {
      window.removeEventListener("scroll", setScrolledDebounce);
    };
  }, [setScrolledDebounce]);
  return isScrolled;
}
