import { useState, useRef, useEffect } from "react";

export function useDragResize(defaultHeight: number, minHeight = 120, invert = false) {
  const [height, setHeight] = useState(defaultHeight);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientY - startY.current;
      // invert=true: dragging up (negative delta) grows the section
      setHeight(Math.max(minHeight, startHeight.current + (invert ? -delta : delta)));
    };
    const onMouseUp = () => { isDragging.current = false; };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [minHeight, invert]);

  return { height, handleDragStart };
}
