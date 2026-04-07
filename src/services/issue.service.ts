import { GithubIssue, Milestone } from "../types";
import { parseMilestone } from "../utils";
import { apiClient } from "./apiClient";

export const getMilestones = async (): Promise<Milestone[]> => {
  try {
    const data = await apiClient.get<GithubIssue[]>("?state=open");
    return data.map(parseMilestone).sort((a, b) => a.age - b.age);
  } catch (error) {
    console.error("fetch error:", error);
    throw error;
  }
};
