import React, { useState } from "react";
import { cn } from "@/utils";
import { Milestone, MilestoneInput } from "@/types";

interface MilestoneFormProps {
  onSubmit: (data: MilestoneInput) => Promise<unknown>;
  onCancel: () => void;
  initialData?: Milestone;
}

export const MilestoneForm = ({ onSubmit, onCancel, initialData }: MilestoneFormProps) => {
  const [formData, setFormData] = useState({
    age: initialData?.age.toString() || "",
    title: initialData?.title || "",
    content: initialData?.content || "",
    tags: initialData?.tags.join(", ") || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        age: Number(formData.age),
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      });
      onCancel();
    } catch (err) {
      console.error("Milestone submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 space-y-4 shadow-xl"
    >
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="나이"
          required
          className="w-20 p-2 rounded-lg border dark:bg-surface-800 dark:border-surface-700"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="어떤 일이 있었나요?"
          required
          className="flex-1 p-2 rounded-lg border dark:bg-surface-800 dark:border-surface-700"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <textarea
        placeholder="자세한 내용을 적어주세요 (Markdown 지원)"
        rows={4}
        className="w-full p-2 rounded-lg border dark:bg-surface-800 dark:border-surface-700"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />
      <input
        type="text"
        placeholder="태그 (쉼표로 구분: study, work)"
        className="w-full p-2 rounded-lg border dark:bg-surface-800 dark:border-surface-700"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-surface-500">
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "px-4 py-2 bg-primary text-white rounded-lg",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? "기록 중..." : "등록하기"}
        </button>
      </div>
    </form>
  );
};
