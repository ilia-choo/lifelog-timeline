import { GithubIssue, Milestone } from "../types";
import { parseMilestone } from "../utils";
import { BASE_URL } from "./baseUrl";

export const getMilestones = async (): Promise<Milestone[]> => {
  try {
    const response = await fetch(`${BASE_URL}?state=open`);

    if (!response.ok) {
      throw new Error("GitHub API 호출에 실패했습니다.");
    }

    const data: GithubIssue[] = await response.json();

    return data.map(parseMilestone).sort((a, b) => a.age - b.age);
  } catch (error) {
    console.error("fetch error:", error);
    throw error;
  }
};
