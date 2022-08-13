import React, { useEffect } from "react";

export const useOnEscape = (
  isActive: boolean,
  onEscape: (event: KeyboardEvent | React.KeyboardEvent) => void
) => {
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape(event);
      }
    };
    if (isActive) {
      document.addEventListener("keydown", onKeydown);
      return () => document.removeEventListener("keydown", onKeydown);
    }
  }, [onEscape, isActive]);
};
