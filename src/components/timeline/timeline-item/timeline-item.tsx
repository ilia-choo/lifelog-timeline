import { motion } from "framer-motion";
import { Milestone } from "@/types";
import { useState } from "react";
import { MilestoneForm } from "@/components/timeline/milestone-form";
import { useMilestoneContext } from "@/contexts";
import { TimelineItemCard } from "./timeline-item-card";

export const TimelineItem = ({ milestone }: { milestone: Milestone }) => {
  const { actions } = useMilestoneContext();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="pl-10 pb-12">
        <MilestoneForm
          initialData={milestone}
          onSubmit={(data) => actions.editItem(milestone.number, data)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <motion.div
      id={`milestone-${milestone.number}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative pl-10 pb-12 last:pb-0 scroll-mt-24"
    >
      <div className="absolute left-[11px] top-0 bottom-0 w-line bg-surface-200 dark:bg-surface-800 group-last:bottom-full group-last:h-0" />

      <div
        className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 bg-white dark:bg-surface-950 z-10 transition-all duration-300
        ${
          milestone.isHighImpact
            ? "border-primary scale-125 shadow-[0_0_15px_rgba(59,130,246,0.5)] ring-4 ring-primary/10"
            : "border-surface-300 dark:border-surface-600 group-hover:border-primary/50"
        }`}
      />

      <TimelineItemCard
        milestone={milestone}
        onEdit={() => setIsEditing(true)}
        onDelete={() => actions.deleteItem(milestone.number)}
      />
    </motion.div>
  );
};
