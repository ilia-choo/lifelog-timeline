import { motion } from "framer-motion";
import { Calendar, Trophy } from "lucide-react";
import { Milestone } from "@/types";
import { MilestoneMarkdown } from "./milestone-markdown";
import { TimelineItemActions } from "./timeline-item-actions";
import { TimelineItemTags } from "./timeline-item-tags";

interface TimelineItemCardProps {
  milestone: Milestone;
  onEdit: () => void;
  onDelete: () => void;
}

export const TimelineItemCard = ({ milestone, onEdit, onDelete }: TimelineItemCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative p-6 bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 transition-all duration-300 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
            {milestone.age}세
          </span>
          {milestone.isHighImpact && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-bold border border-amber-200 dark:border-amber-800">
              <Trophy className="w-3 h-3" />
              Key
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-surface-500 font-medium ml-auto md:ml-0 pr-20 md:pr-0">
          <Calendar className="w-3 h-3" />
          {milestone.date}
        </div>

        <TimelineItemActions onEdit={onEdit} onDelete={onDelete} />
      </div>

      <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-3 group-hover:text-primary transition-colors">
        {milestone.title}
      </h3>

      <MilestoneMarkdown content={milestone.content} />
      <TimelineItemTags tags={milestone.tags} />
    </motion.div>
  );
};
