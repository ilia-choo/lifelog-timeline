import { motion } from "framer-motion";
import { BarChart3, Quote, Sparkles } from "lucide-react";
import { Milestone } from "@/types";

interface DashboardProps {
  stats: { total: number; highImpactCount: number; mostActiveAge: string } | null;
  randomItem: Milestone | null;
}

export const Dashboard = ({ stats, randomItem }: DashboardProps) => {
  if (!stats || !randomItem) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-1 p-5 bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-800 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4 text-primary">
          <BarChart3 className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Life Stats</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-surface-500 text-xs">총 기록</span>
            <span className="text-xl font-black">{stats.total}개</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-surface-500 text-xs">주요 마일스톤</span>
            <span className="text-xl font-black text-amber-500">{stats.highImpactCount}개</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-surface-500 text-xs">가장 활발했던 나이</span>
            <span className="text-xl font-black text-primary">{stats.mostActiveAge}세</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2 p-5 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 rounded-3xl border border-primary/10 dark:border-primary/20 relative overflow-hidden group"
      >
        <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
        <div className="flex items-center gap-2 mb-3 text-primary">
          <Quote className="w-4 h-4 fill-primary" />
          <span className="text-xs font-bold uppercase tracking-wider">Random Recall</span>
        </div>
        <p className="text-sm text-surface-500 dark:text-surface-400 mb-2">
          {randomItem.age}살의 당신은 이런 기록을 남겼네요:
        </p>
        <h4 className="text-lg font-bold text-surface-900 dark:text-surface-100 line-clamp-1">
          {randomItem.title}
        </h4>
        <p className="text-xs text-primary mt-3 font-medium cursor-pointer hover:underline">
          자세히 보러가기 →
        </p>
      </motion.div>
    </div>
  );
};
