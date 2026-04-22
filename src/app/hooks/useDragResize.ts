import { useState, useRef, useEffect } from "react";

export function useDragResize(defaultHeight: number, minHeight = 120) {
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
      setHeight(Math.max(minHeight, startHeight.current + delta));
    };
    const onMouseUp = () => { isDragging.current = false; };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [minHeight]);

  return { height, handleDragStart };
}
