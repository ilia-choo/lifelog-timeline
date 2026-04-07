import { motion, AnimatePresence } from "framer-motion";
import { TimelineItem } from "./timeline-item";
import { Milestone } from "../types";

interface TimelineListProps {
  milestones: Milestone[];
  error: string | null;
}

export const TimelineList = ({ milestones, error }: TimelineListProps) => {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-red-500 bg-white dark:bg-surface-900 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm"
      >
        {error}
      </motion.div>
    );
  }

  if (milestones.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-32 text-surface-400 dark:text-surface-600 bg-white dark:bg-surface-900/50 rounded-3xl border border-dashed border-surface-200 dark:border-surface-800"
      >
        검색 결과가 없습니다.
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout">
        {milestones.map((milestone) => (
          <TimelineItem key={milestone.id} milestone={milestone} />
        ))}
      </AnimatePresence>
    </div>
  );
};
