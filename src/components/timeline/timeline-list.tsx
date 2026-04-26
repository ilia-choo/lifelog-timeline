import { AnimatePresence } from "framer-motion";
import { TimelineItem } from "./timeline-item";
import { Milestone } from "@/types";

interface TimelineListProps {
  groupedMilestones: { decade: number; items: Milestone[] }[];
  error: string | null;
  onDelete: (number: number) => void;
  onUpdate: (
    issueNumber: number,
    data: { age: number; title: string; content: string; tags: string[] }
  ) => Promise<void>;
}

export const TimelineList = ({
  groupedMilestones,
  error,
  onDelete,
  onUpdate
}: TimelineListProps) => {
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (groupedMilestones.length === 0)
    return <div className="text-center py-32 text-surface-400">기록이 없습니다.</div>;

  return (
    <div className="space-y-16">
      {groupedMilestones.map((group) => (
        <section key={group.decade} className="relative mt-20 first:mt-0">
          <div className="sticky top-0 z-30 py-4 -mx-4 px-4 bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-md transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-primary/40 tracking-tighter">
                {group.decade}
              </span>
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Chapter
                </span>
                <span className="text-sm font-bold text-surface-900 dark:text-surface-100">
                  The {group.decade}s
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
            </div>
          </div>

          <div className="pt-8 relative">
            <AnimatePresence mode="popLayout">
              {group.items.map((milestone) => (
                <TimelineItem
                  key={milestone.id}
                  milestone={milestone}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      ))}
    </div>
  );
};
