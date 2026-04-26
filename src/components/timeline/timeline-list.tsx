import { AnimatePresence } from "framer-motion";
import { TimelineItem } from "./timeline-item";
import { useMilestoneContext } from "@/contexts";
import { useMemo } from "react";
import { Milestone } from "@/types";

export const TimelineList = () => {
  const { filteredMilestones, error } = useMilestoneContext();

  const groupedMilestones = useMemo(() => {
    const groups: { [key: number]: Milestone[] } = {};
    filteredMilestones.forEach((m) => {
      const decade = Math.floor(m.age / 10) * 10;
      if (!groups[decade]) groups[decade] = [];
      groups[decade].push(m);
    });

    return Object.keys(groups)
      .map(Number)
      .sort((a, b) => a - b)
      .map((decade) => ({
        decade,
        items: groups[decade]
      }));
  }, [filteredMilestones]);

  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (groupedMilestones.length === 0)
    return <div className="text-center py-32 text-surface-400">기록이 없습니다.</div>;

  return (
    <div className="space-y-12">
      {groupedMilestones.map((group) => (
        <section key={group.decade} className="relative mt-16 first:mt-0">
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
                <TimelineItem key={milestone.id} milestone={milestone} />
              ))}
            </AnimatePresence>
          </div>
        </section>
      ))}
    </div>
  );
};
