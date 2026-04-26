import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components";
import { LayoutDashboard, History } from "lucide-react";

export const SiteHeader = ({ isDark, toggle }: { isDark: boolean; toggle: () => void }) => {
  const { pathname } = useLocation();

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-black text-surface-900 dark:text-white tracking-tight mb-4">
          LifeLog <span className="text-primary">Timeline</span>
        </h1>

        <nav className="flex gap-1 p-1 bg-surface-100 dark:bg-surface-900 w-fit rounded-xl border border-surface-200 dark:border-surface-800">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              pathname === "/"
                ? "bg-white dark:bg-surface-800 text-primary shadow-sm"
                : "text-surface-500 hover:text-surface-900 dark:hover:text-surface-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link
            to="/timeline"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              pathname === "/timeline"
                ? "bg-white dark:bg-surface-800 text-primary shadow-sm"
                : "text-surface-500 hover:text-surface-900 dark:hover:text-surface-100"
            }`}
          >
            <History className="w-4 h-4" /> Timeline
          </Link>
        </nav>
      </div>
      <ThemeToggle isDark={isDark} toggle={toggle} />
    </header>
  );
};
