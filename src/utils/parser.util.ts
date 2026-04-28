import { Milestone, GithubIssue } from "@/types";

export const parseMilestone = (issue: GithubIssue): Milestone => {
  const ageMatch = issue.title.match(/^\[(\d+)\]/);
  const age = ageMatch ? parseInt(ageMatch[1], 10) : 0;
  const cleanTitle = issue.title.replace(/^\[\d+\]/, "").trim();

  return {
    id: issue.id,
    number: issue.number,
    age,
    title: cleanTitle || "Untitled",
    content: issue.body,
    tags: issue.labels.map((l) => l.name),
    date: new Date(issue.created_at).toLocaleDateString(),
    isHighImpact: issue.reactions.total_count >= 3
  };
};
