import { RefObject, useCallback } from "react";

type ScrollDirection = "left" | "right" | "start" | "end";

const horizontalScroll = (
  container: HTMLElement,
  direction: ScrollDirection,
  distance: number
) => {
  if (direction === "start") {
    container.scrollLeft = 0;
  } else if (direction === "end") {
    container.scrollLeft = container.scrollWidth;
  } else if (direction === "left") {
    container.scrollLeft -= distance;
  } else {
    container.scrollLeft += distance;
  }
};

export function useHorizontalScroll<T extends HTMLElement>(
  containerReference: RefObject<T>,
  distance = 100
) {
  return {
    /**
     * Scrolls the container to a given direction, or to the start/end of the container.
     */
    scrollTo: useCallback(
      (direction: ScrollDirection) => {
        if (containerReference.current) {
          horizontalScroll(containerReference.current, direction, distance);
        }
      },
      [containerReference, distance]
    ),

    /**
     * Scrolls the container to the given position in Px.
     */
    scrollAt: useCallback(
      (position: number) => {
        if (containerReference.current) {
          containerReference.current.scrollLeft = position;
        }
      },
      [containerReference]
    ),
  };
}
