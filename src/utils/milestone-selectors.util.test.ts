import { Milestone } from "@/types";
import {
  filterMilestones,
  getMilestoneCategories,
  getMilestoneStats,
  getRandomMilestone,
  getSortedMilestones,
  groupMilestonesByDecade
} from "./milestone-selectors.util";

const createMilestone = (overrides: Partial<Milestone>): Milestone => ({
  id: 1,
  number: 1,
  age: 20,
  title: "Default title",
  content: "Default content",
  tags: [],
  date: "2020. 1. 1.",
  isHighImpact: false,
  ...overrides
});

describe("milestone selectors", () => {
  const milestones: Milestone[] = [
    createMilestone({
      id: 1,
      number: 1,
      age: 29,
      title: "첫 회사 입사",
      content: "커리어를 시작했다",
      tags: ["work", "career"],
      date: "2020. 5. 1.",
      isHighImpact: true
    }),
    createMilestone({
      id: 2,
      number: 2,
      age: 18,
      title: "졸업",
      content: "학교 생활을 마쳤다",
      tags: ["school"],
      date: "2014. 2. 10."
    }),
    createMilestone({
      id: 3,
      number: 3,
      age: 29,
      title: "사이드 프로젝트",
      content: "React로 타임라인을 만들었다",
      tags: ["project", "career"],
      date: "2019. 8. 3."
    }),
    createMilestone({
      id: 4,
      number: 4,
      age: 34,
      title: "중요한 전환점",
      content: "삶의 방향을 다시 정했다",
      tags: ["life"],
      date: "2024. 4. 20.",
      isHighImpact: true
    })
  ];

  it("sorts milestones by age first, then by date", () => {
    const result = getSortedMilestones(milestones);

    expect(result.map((milestone) => milestone.id)).toEqual([2, 3, 1, 4]);
  });

  it("does not mutate the original milestone list while sorting", () => {
    const result = getSortedMilestones(milestones);

    expect(result).not.toBe(milestones);
    expect(milestones.map((milestone) => milestone.id)).toEqual([1, 2, 3, 4]);
  });

  it("returns unique categories sorted alphabetically", () => {
    const result = getMilestoneCategories(milestones);

    expect(result).toEqual(["career", "life", "project", "school", "work"]);
  });

  it("filters milestones by category, high impact, and search query", () => {
    const result = filterMilestones(milestones, {
      selectedCategory: "career",
      showHighImpact: true,
      searchQuery: "회사"
    });

    expect(result.map((milestone) => milestone.id)).toEqual([1]);
  });

  it("matches search queries against title and content case-insensitively", () => {
    const result = filterMilestones(milestones, {
      selectedCategory: null,
      showHighImpact: false,
      searchQuery: "react"
    });

    expect(result.map((milestone) => milestone.id)).toEqual([3]);
  });

  it("groups milestones by decade in ascending decade order", () => {
    const result = groupMilestonesByDecade(getSortedMilestones(milestones));

    expect(result).toEqual([
      { decade: 10, items: [milestones[1]] },
      { decade: 20, items: [milestones[2], milestones[0]] },
      { decade: 30, items: [milestones[3]] }
    ]);
  });

  it("calculates total, high impact count, and the most active age", () => {
    const result = getMilestoneStats(milestones);

    expect(result).toEqual({
      total: 4,
      highImpactCount: 2,
      mostActiveAge: "29"
    });
  });

  it("returns null stats and random milestone for an empty list", () => {
    expect(getMilestoneStats([])).toBeNull();
    expect(getRandomMilestone([])).toBeNull();
  });

  it("selects a random milestone by Math.random index", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.75);

    expect(getRandomMilestone(milestones)).toBe(milestones[3]);

    jest.restoreAllMocks();
  });
});
