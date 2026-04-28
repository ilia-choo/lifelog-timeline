import { Pencil, Trash2 } from "lucide-react";

interface TimelineItemActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TimelineItemActions = ({ onEdit, onDelete }: TimelineItemActionsProps) => {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={onEdit}
        className="p-2 opacity-0 group-hover:opacity-100 text-surface-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-2 opacity-0 group-hover:opacity-100 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
