import styled from "@emotion/styled";
import React, {
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { isOverflowing } from "../hooks/useIsOverflowing";
import useResizeObserver from ".././hooks/useResizeObserver";
import IconButton from "./IconButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

enum ScrollPosition {
  Start,
  End,
  Other,
}

const Container = styled.div`
  min-width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentBox = styled.div<{
  overflows: boolean;
  scrollPosition: ScrollPosition;
}>`
  flex-grow: 1;
  position: relative;
  overflow: hidden;

  &:after,
  &:before {
    display: ${({ overflows }) => (overflows ? "block" : "none")};
    content: "";
    position: absolute;
    z-index: 1;
    width: 10px;
    height: 100%;
    top: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:after {
    opacity: ${({ scrollPosition }) =>
      scrollPosition !== ScrollPosition.End ? "1" : "0"};
    right: -2px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 100%
    );
  }

  &:before {
    opacity: ${({ scrollPosition }) =>
      scrollPosition !== ScrollPosition.Start ? "1" : "0"};
    left: -2px;
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

const ScrollBox = styled.div`
  min-width: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  position: relative;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowButton = styled(IconButton)`
  flex-shrink: 0;
  padding: 0;
`;

type Props = {
  children: React.ReactNode;
  lastRefresh?: Date;
  onOverflowChange?: (overflow: boolean) => void;
  onScroll?: () => void;
};

const HorizontalScrollBoxControl = ({
  children,
  onScroll,
  onOverflowChange,
  lastRefresh,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useHorizontalScroll(scrollRef, 250);

  const [displayScrollArrows, setDisplayScrollArrows] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(ScrollPosition.Start);

  const updateScrollArrowsState = useCallback(() => {
    if (scrollRef.current) {
      setDisplayScrollArrows(isOverflowing(scrollRef.current));
    }
  }, [scrollRef]);

  useEffect(() => {
    onOverflowChange?.(displayScrollArrows);
  }, [displayScrollArrows, onOverflowChange]);

  const { ref: containerRef } = useResizeObserver(
    updateScrollArrowsState,
    false
  );

  const calculateScrollPositon = useCallback(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      if (element.scrollLeft === 0) {
        setScrollPosition(ScrollPosition.Start);
      } else if (
        Math.abs(
          element.scrollLeft - (element.scrollWidth - element.clientWidth)
        ) <= 1
      ) {
        setScrollPosition(ScrollPosition.End);
      } else {
        setScrollPosition(ScrollPosition.Other);
      }
    }
  }, []);

  const handleScrollEvent = useCallback(() => {
    calculateScrollPositon();
    onScroll?.();
  }, [calculateScrollPositon, onScroll]);

  useLayoutEffect(() => {
    if (lastRefresh) {
      updateScrollArrowsState();
      calculateScrollPositon();
    }
  }, [calculateScrollPositon, lastRefresh, updateScrollArrowsState]);

  return (
    <Container ref={containerRef}>
      {displayScrollArrows ? (
        <ArrowButton
          iconSize={20}
          Icon={FiChevronLeft}
          disabled={scrollPosition === ScrollPosition.Start}
          onClick={() => scrollTo("left")}
        />
      ) : null}
      <ContentBox
        overflows={displayScrollArrows}
        scrollPosition={scrollPosition}
      >
        <ScrollBox ref={scrollRef} onScroll={handleScrollEvent}>
          {children}
        </ScrollBox>
      </ContentBox>
      {displayScrollArrows ? (
        <ArrowButton
          iconSize={20}
          Icon={FiChevronRight}
          disabled={scrollPosition === ScrollPosition.End}
          onClick={() => scrollTo("right")}
        />
      ) : null}
    </Container>
  );
};

export default HorizontalScrollBoxControl;
