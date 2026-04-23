import { Search, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  showHighImpact: boolean;
  onToggleHighImpact: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  showHighImpact,
  onToggleHighImpact,
  searchQuery,
  onSearchChange
}: FilterBarProps) => {
  return (
    <div className="space-y-6 mb-12">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="기록 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-surface-100 placeholder:text-surface-400"
          />
        </div>

        <button
          onClick={onToggleHighImpact}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap
          ${
            showHighImpact
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
              : "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-400 hover:border-primary/50"
          }`}
        >
          <Trophy className={`w-4 h-4 ${showHighImpact ? "fill-white" : ""}`} />
          <span className="text-sm font-medium">중요 기록만</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border
          ${
            selectedCategory === null
              ? "bg-primary text-white border-primary"
              : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-transparent hover:bg-surface-200 dark:hover:bg-surface-700"
          }`}
        >
          전체
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ y: -2 }}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border
            ${
              selectedCategory === cat
                ? "bg-primary text-white border-primary"
                : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-transparent hover:bg-surface-200 dark:hover:bg-surface-700"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
