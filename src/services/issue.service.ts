import { GithubIssue, Milestone, MilestoneInput } from "@/types";
import { getSortedMilestones, parseMilestone } from "@/utils";
import { apiClient } from "@/apis/apiClient";

export const getMilestones = async (): Promise<Milestone[]> => {
  try {
    const data = await apiClient.get<GithubIssue[]>("?state=open");
    return getSortedMilestones(data.map(parseMilestone));
  } catch (error) {
    console.error("fetch error:", error);
    throw error;
  }
};

export const createMilestone = async (data: MilestoneInput): Promise<Milestone> => {
  const body = {
    title: `[${data.age}] ${data.title}`,
    body: data.content,
    labels: data.tags
  };

  const response = await apiClient.post<GithubIssue>("", body);
  return parseMilestone(response);
};

export const deleteMilestone = async (issueNumber: number) => {
  await apiClient.patch(`/${issueNumber}`, { state: "closed" });
};

export const updateMilestone = async (
  issueNumber: number,
  data: MilestoneInput
): Promise<Milestone> => {
  const body = {
    title: `[${data.age}] ${data.title}`,
    body: data.content,
    labels: data.tags
  };

  const response = await apiClient.patch<GithubIssue>(`/${issueNumber}`, body);
  return parseMilestone(response);
};
