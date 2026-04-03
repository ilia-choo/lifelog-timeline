import ReactMarkdown from "react-markdown";
import { Milestone } from "../types";

export const TimelineItem = ({ milestone }: { milestone: Milestone }) => {
  return (
    <div className="group relative flex items-start mb-12 last:mb-0">
      <div className="absolute left-4 top-0 h-full w-line bg-surface-100 group-last:h-0" />
      <div
        className={`ml-8 p-6 rounded-xl border transition-all w-full
        ${
          milestone.isHighImpact
            ? "bg-white border-primary shadow-md ring-1 ring-primary/10"
            : "bg-white border-surface-100 hover:border-primary/30 shadow-sm"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary font-bold text-sm tracking-tighter bg-primary/5 px-2 py-0.5 rounded">
            Age {milestone.age}
          </span>
          <span className="text-[10px] text-surface-600 font-mono italic">
            {milestone.date}
          </span>
        </div>

        <h3 className="text-surface-900 font-bold text-xl mb-3">
          {milestone.title}
        </h3>

        <div className="text-surface-600 text-sm leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="rounded-lg my-2 max-h-48 object-cover w-full"
                  alt="content"
                />
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-inside my-2" />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-surface-100 pl-4 italic my-2 text-surface-600"
                />
              ),
            }}
          >
            {milestone.content}
          </ReactMarkdown>
        </div>

        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-surface-50">
          {milestone.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface-50 text-[11px] text-surface-600 rounded-md border border-surface-100 transition-colors hover:bg-primary/5 hover:text-primary hover:border-primary/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
