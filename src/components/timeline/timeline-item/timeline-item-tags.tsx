import { Hash } from "lucide-react";

interface TimelineItemTagsProps {
  tags: string[];
}

export const TimelineItemTags = ({ tags }: TimelineItemTagsProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-surface-100 dark:border-surface-800">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2.5 py-1 bg-surface-50 dark:bg-surface-800/50 text-[11px] text-surface-500 dark:text-surface-400 rounded-lg border border-surface-200 dark:border-surface-700"
        >
          <Hash className="w-3 h-3 opacity-50" />
          {tag}
        </span>
      ))}
    </div>
  );
};
