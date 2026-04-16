import React from 'react';
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
  if (!isOpen) return null;

  // Format category to keep TOR in all caps
  const formattedCategory = category.toUpperCase() === 'TOR' ? 'TOR' : category;
  const title = `${component} ${formattedCategory} ${metric} Issues`;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className="fixed right-0 top-0 bottom-0 w-[70%] bg-white dark:bg-[#1a1a1a] shadow-xl z-50 flex flex-col"
        style={{
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#d8d8d8] dark:border-[#404040]">
          <h2 className="font-semibold text-[24px] text-black dark:text-white">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70"
          >
            <div className="absolute inset-[20.83%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
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

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}