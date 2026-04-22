import { useEffect, useRef } from 'react';
import closeIcon from "../../imports/svg-close-icon";
import { IssuesChart } from "./IssuesChart";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  component: string;
  metric: string;
  category: string;
}

export function SideDrawer({ isOpen, onClose, component, metric, category }: SideDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const formattedCategory = category.toUpperCase() === 'TOR' ? 'TOR' : category;
  const title = `${component} ${formattedCategory} ${metric} Issues`;

  // Move focus into drawer on open; restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-drawer-title"
        className="fixed right-0 top-0 bottom-0 w-[70%] bg-white dark:bg-[#1a1a1a] shadow-xl z-50 flex flex-col animate-[slideInFromRight_0.3s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#d8d8d8] dark:border-[#404040]">
          <h2 id="side-drawer-title" className="font-semibold text-[24px] text-black dark:text-white">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close issues panel"
            className="relative shrink-0 size-[32px] cursor-pointer hover:opacity-70 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
          >
            <div className="absolute inset-[20.83%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" aria-hidden="true">
                <path d={closeIcon.p31782000} fill="var(--fill-0, #222222)" className="dark:fill-[#e0e0e0]" />
              </svg>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <IssuesChart key={`${component}-${metric}-${category}`} component={component} metric={metric} category={category} />
        </div>
      </div>
    </>
  );
}
