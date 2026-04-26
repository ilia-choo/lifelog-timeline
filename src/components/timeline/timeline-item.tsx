import { motion } from "framer-motion";
import { Trophy, Calendar, Hash, Trash2, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Milestone } from "@/types";
import { useState } from "react";
import { MilestoneForm } from "@/components/timeline/milestone-form";

export const TimelineItem = ({
  milestone,
  onDelete,
  onUpdate
}: {
  milestone: Milestone;
  onDelete: (number: number) => void;
  onUpdate: (
    issueNumber: number,
    data: { age: number; title: string; content: string; tags: string[] }
  ) => Promise<void>;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="pl-10 pb-12">
        <MilestoneForm
          initialData={milestone}
          onSubmit={async (data) => {
            await onUpdate(milestone.number, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative pl-10 pb-12 last:pb-0"
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

      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        className="relative p-6 bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 transition-all duration-300"
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

          <div className="flex items-center gap-1 text-xs text-surface-500 font-medium ml-auto md:ml-0">
            <Calendar className="w-3 h-3" />
            {milestone.date}
          </div>
          <div className="flex gap-1 z-20">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 opacity-0 group-hover:opacity-100 text-surface-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(milestone.number)}
              className="p-2 opacity-0 group-hover:opacity-100 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
              title="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-3 group-hover:text-primary transition-colors">
          {milestone.title}
        </h3>

        <div className="prose prose-sm dark:prose-invert max-w-none text-surface-600 dark:text-surface-400 leading-relaxed">
          <ReactMarkdown
            components={{
              img: ({ ...props }) => (
                <img
                  {...props}
                  className="rounded-xl my-4 max-h-64 object-cover w-full shadow-md"
                  alt="milestone"
                />
              ),
              ul: ({ ...props }) => (
                <ul {...props} className="list-disc list-inside space-y-1 my-3" />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-primary/20 pl-4 py-1 italic bg-primary/5 rounded-r-lg my-3"
                />
              )
            }}
          >
            {milestone.content}
          </ReactMarkdown>
        </div>

        {milestone.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-surface-100 dark:border-surface-800">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-1 bg-surface-50 dark:bg-surface-800/50 text-[11px] text-surface-500 dark:text-surface-400 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-primary/40 hover:text-primary transition-all cursor-default"
              >
                <Hash className="w-3 h-3 opacity-50" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
