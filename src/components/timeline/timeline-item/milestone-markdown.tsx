import ReactMarkdown from "react-markdown";

interface MilestoneMarkdownProps {
  content: string;
}

export const MilestoneMarkdown = ({ content }: MilestoneMarkdownProps) => {
  return (
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
          ul: ({ ...props }) => <ul {...props} className="list-disc list-inside space-y-1 my-3" />,
          blockquote: ({ ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-primary/20 pl-4 py-1 italic bg-primary/5 rounded-r-lg my-3"
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
