import { useState } from "react";
import { useOnWindowResize } from "./useOnWindowResize";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export default function useDevice(expected?: ScreenSize) {
  const [size, setSize] = useState(getCurrentScrenSize);
  useOnWindowResize(true, () => setSize(getCurrentScrenSize()));
  return expected ? size === expected : size;
}

function getCurrentScrenSize(): ScreenSize {
  if (typeof window === "undefined") return "xl";
  if (window.matchMedia("(min-width: 1536px)").matches) return "2xl";
  if (window.matchMedia("(min-width: 1280px)").matches) return "xl";
  if (window.matchMedia("(min-width: 1024px)").matches) return "lg";
  if (window.matchMedia("(min-width: 768px)").matches) return "md";
  if (window.matchMedia("(min-width: 640px)").matches) return "sm";
  return "xs";
}
