import { Outlet } from "react-router";
import { Header } from "./Header";
import { Toaster } from "./ui/sonner";

export function Layout() {
  return (
    <div className="size-full flex flex-col bg-white dark:bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Outlet />
      </div>
      <Toaster position="top-right" closeButton />
    </div>
  );
}
