import { useCallback } from "react";

export const useScrollTo = () => {
  return useCallback((position: "top" | "end", delayMs = 0) => {
    window.setTimeout(() => {
      window.scrollTo({
        top: position === "end" ? document.body.scrollHeight : 0,
        left: 0,
        behavior: "smooth",
      });
    }, delayMs);
  }, []);
};
