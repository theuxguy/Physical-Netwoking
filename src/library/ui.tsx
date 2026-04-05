import { cn } from "../app/components/ui/utils";

export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{title}</h1>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">{description}</p>
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

export function Preview({
  children,
  label,
  code,
  className,
  center = false,
}: {
  children: React.ReactNode;
  label?: string;
  code?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {label && (
        <div className="px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
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
      {code && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-5 py-3">
          <code className="text-xs font-mono text-slate-600 dark:text-slate-400">{code}</code>
        </div>
      )}
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
      <td className="py-2.5 pr-4">
        <code className="text-xs font-mono text-violet-600 dark:text-violet-400">{name}</code>
      </td>
      <td className="py-2.5 pr-4">
        <code className="text-xs font-mono text-slate-600 dark:text-slate-400">{value}</code>
      </td>
      <td className="py-2.5 text-xs text-slate-500 dark:text-slate-400">{description}</td>
    </tr>
  );
}

export function TokenTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-2.5 w-48">Token</th>
            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-0 py-2.5 w-48">Value</th>
            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 py-2.5">Description</th>
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
      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-500">{value}</p>
        {note && <p className="text-xs text-slate-400">{note}</p>}
      </div>
    </div>
  );
}
