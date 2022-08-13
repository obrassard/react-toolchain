import { useCallback, useEffect, useState } from "react";

export function useIsWindowScrolled(threshold: number) {
  const [headerCollapsed, setHeaderCollapsed] = useState(
    window.pageYOffset > threshold
  );
  const setScrolled = useCallback(() => {
    setHeaderCollapsed(window.pageYOffset > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", setScrolled);
    return () => {
      window.removeEventListener("scroll", setScrolled);
    };
  }, [setScrolled]);
  return headerCollapsed;
}
