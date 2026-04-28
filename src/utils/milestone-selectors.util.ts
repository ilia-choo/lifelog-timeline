import { Milestone, MilestoneFilters, MilestoneGroup, MilestoneStats } from "@/types";

export const sortMilestones = (a: Milestone, b: Milestone) => {
  if (a.age !== b.age) {
    return a.age - b.age;
  }

  return new Date(a.date).getTime() - new Date(b.date).getTime();
};

export const getSortedMilestones = (milestones: Milestone[]) => {
  return [...milestones].sort(sortMilestones);
};

export const getMilestoneCategories = (milestones: Milestone[]) => {
  const tags = new Set<string>();
  milestones.forEach((milestone) => milestone.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags).sort();
};

export const filterMilestones = (milestones: Milestone[], filters: MilestoneFilters) => {
  const normalizedSearchQuery = filters.searchQuery.trim().toLowerCase();

  return milestones.filter((milestone) => {
    const matchesCategory =
      !filters.selectedCategory || milestone.tags.includes(filters.selectedCategory);
    const matchesImpact = !filters.showHighImpact || milestone.isHighImpact;
    const matchesSearch =
      !normalizedSearchQuery ||
      milestone.title.toLowerCase().includes(normalizedSearchQuery) ||
      milestone.content.toLowerCase().includes(normalizedSearchQuery);

    return matchesCategory && matchesImpact && matchesSearch;
  });
};

export const groupMilestonesByDecade = (milestones: Milestone[]): MilestoneGroup[] => {
  const groups = milestones.reduce<Record<number, Milestone[]>>((acc, milestone) => {
    const decade = Math.floor(milestone.age / 10) * 10;
    acc[decade] = [...(acc[decade] ?? []), milestone];
    return acc;
  }, {});

  return Object.keys(groups)
    .map(Number)
    .sort((a, b) => a - b)
    .map((decade) => ({
      decade,
      items: groups[decade]
    }));
};

export const getMilestoneStats = (milestones: Milestone[]): MilestoneStats | null => {
  if (milestones.length === 0) return null;

  const ageCounts = milestones.reduce<Record<number, number>>((acc, milestone) => {
    acc[milestone.age] = (acc[milestone.age] ?? 0) + 1;
    return acc;
  }, {});

  const mostActiveAge = Object.keys(ageCounts).reduce((currentAge, nextAge) =>
    ageCounts[Number(currentAge)] > ageCounts[Number(nextAge)] ? currentAge : nextAge
  );

  return {
    total: milestones.length,
    highImpactCount: milestones.filter((milestone) => milestone.isHighImpact).length,
    mostActiveAge
  };
};

export const getRandomMilestone = (milestones: Milestone[]) => {
  if (milestones.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * milestones.length);
  return milestones[randomIndex];
};
