import { Milestone, GithubIssue } from "../types";

export const parseMilestone = (issue: GithubIssue): Milestone => {
  // [숫자] 패턴 추출 (정규표현식)
  const ageMatch = issue.title.match(/^\[(\d+)\]/);
  const age = ageMatch ? parseInt(ageMatch[1], 10) : 0;

  // 제목에서 [숫자] 제거
  const cleanTitle = issue.title.replace(/^\[\d+\]/, "").trim();

  return {
    id: issue.id,
    age,
    title: cleanTitle || "Untitled",
    content: issue.body,
    tags: issue.labels.map((l) => l.name),
    date: new Date(issue.created_at).toLocaleDateString(),
    isHighImpact: issue.reactions.total_count >= 3,
  } as Milestone;
};
