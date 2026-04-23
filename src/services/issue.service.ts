import { GithubIssue, Milestone } from "@/types";
import { parseMilestone } from "@/utils";
import { apiClient } from "@/apis/apiClient";

export const getMilestones = async (): Promise<Milestone[]> => {
  try {
    const data = await apiClient.get<GithubIssue[]>("?state=open");
    return data.map(parseMilestone).sort((a, b) => a.age - b.age);
  } catch (error) {
    console.error("fetch error:", error);
    throw error;
  }
};

export const createMilestone = async (data: {
  age: number;
  title: string;
  content: string;
  tags: string[];
}): Promise<Milestone> => {
  const body = {
    title: `[${data.age}] ${data.title}`,
    body: data.content,
    labels: data.tags
  };

  const response = await apiClient.post<GithubIssue>("", body);
  return parseMilestone(response);
};
