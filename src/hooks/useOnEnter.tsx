import { useCallback, useEffect } from "react";

export const useOnEnter = (
  isActive: boolean,
  onEnter: () => void,
  andCtrlKey?: boolean,
  andMetaKey?: boolean
) => {
  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      let extraKey: boolean | undefined;
      if (andCtrlKey) extraKey = event.ctrlKey;
      if (andMetaKey) extraKey = event.metaKey ?? undefined;

      if (event.key === "Enter" && (extraKey === undefined || extraKey)) {
        onEnter();
      }
    },
    [andCtrlKey, andMetaKey, onEnter]
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", onKeydown);
    } else {
      document.removeEventListener("keydown", onKeydown);
    }
    return () => document.removeEventListener("keydown", onKeydown);
  }, [andCtrlKey, andMetaKey, onEnter, isActive, onKeydown]);
};
