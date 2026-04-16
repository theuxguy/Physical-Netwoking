import { useState } from "react";
import { cn } from "../app/components/ui/utils";

export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{title}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">{description}</p>
    </div>
  );
}

export function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{title}</h2>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CodeBlock — read-only code editor with copy button
// ---------------------------------------------------------------------------
export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#0d1117] border-t border-[#21262d]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#21262d]">
        <span className="text-[10px] font-mono text-[#8b949e] uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-[11px] font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors select-none"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code area */}
      <pre className="overflow-x-auto px-5 py-4 text-[12px] font-mono text-[#e6edf3] leading-[1.8] m-0 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview — component showcase card with optional CodeBlock below
// ---------------------------------------------------------------------------
export function Preview({
  children,
  label,
  code,
  language = "tsx",
  className,
  center = false,
}: {
  children: React.ReactNode;
  label?: string;
  code?: string;
  language?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {label && (
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
        </div>
      )}
      <div
        className={cn(
          "px-6 py-8 bg-white dark:bg-slate-950",
          center && "flex items-center justify-center",
          className
        )}
      >
        {children}
      </div>
      {code && <CodeBlock code={code} language={language} />}
    </div>
  );
}

export function TokenRow({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description: string;
}) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <td className="py-3 pr-4">
        <code className="text-xs font-mono text-violet-600 dark:text-violet-400">{name}</code>
      </td>
      <td className="py-3 pr-4">
        <code className="text-xs font-mono text-slate-600 dark:text-slate-400">{value}</code>
      </td>
      <td className="py-3 text-xs text-slate-500 dark:text-slate-400">{description}</td>
    </tr>
  );
}

export function TokenTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 w-48">Token</th>
            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-0 py-3 w-48">Value</th>
            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950 px-5">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function Swatch({
  color,
  label,
  value,
  note,
  border = false,
}: {
  color: string;
  label: string;
  value: string;
  note?: string;
  border?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-[100px]">
      <div
        className={cn("h-14 w-full rounded-lg", border && "border border-slate-300 dark:border-slate-600")}
        style={{ backgroundColor: color }}
      />
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-500">{value}</p>
        {note && <p className="text-xs text-slate-400">{note}</p>}
      </div>
    </div>
  );
}
