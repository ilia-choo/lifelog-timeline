import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  isDark: boolean;
  toggle: () => void;
}

export const SiteHeader = ({ isDark, toggle }: SiteHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-surface-900 dark:text-white tracking-tight mb-3">
          LifeLog <span className="text-primary">Timeline</span>
        </h1>
        <p className="text-surface-500 dark:text-surface-400 italic font-medium">
          "기록하지 않은 삶은 내 것이 아니다."
        </p>
      </motion.div>
      <ThemeToggle isDark={isDark} toggle={toggle} />
    </header>
  );
};
