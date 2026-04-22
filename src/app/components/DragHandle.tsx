interface DragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export function DragHandle({ onMouseDown }: DragHandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="group relative flex-shrink-0 h-[6px] cursor-row-resize flex items-center justify-center bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] border-y border-gray-200 dark:border-[#333] transition-colors select-none z-20"
      aria-label="Drag to resize"
      role="separator"
      aria-orientation="horizontal"
    >
      <div className="flex gap-[3px] opacity-40 group-hover:opacity-70 transition-opacity">
        <span className="w-[18px] h-[2px] rounded-full bg-gray-500 dark:bg-gray-400" />
      </div>
    </div>
  );
}
