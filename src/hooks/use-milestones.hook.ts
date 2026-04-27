import { useCallback, useEffect, useMemo, useState } from "react";
import { Milestone, MilestoneInput } from "@/types";
import { createMilestone, deleteMilestone, getMilestones, updateMilestone } from "@/services";

export const useMilestones = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHighImpact, setShowHighImpact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sortMilestones = (a: Milestone, b: Milestone) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getMilestones();
      setMilestones(data.sort(sortMilestones));
    } catch (err) {
      setError(err instanceof Error ? err.message : "기록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = useMemo(() => {
    const tags = new Set<string>();
    milestones.forEach((m) => m.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [milestones]);

  const filteredMilestones = useMemo(() => {
    return milestones.filter((m) => {
      const matchesCategory = !selectedCategory || m.tags.includes(selectedCategory);
      const matchesImpact = !showHighImpact || m.isHighImpact;
      const matchesSearch =
        !searchQuery ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesImpact && matchesSearch;
    });
  }, [milestones, selectedCategory, showHighImpact, searchQuery]);

  const addMilestone = async (data: MilestoneInput) => {
    const newEntry = await createMilestone(data);
    setMilestones((prev) => [...prev, newEntry].sort(sortMilestones));
    return newEntry;
  };

  const deleteItem = async (issueNumber: number) => {
    if (!window.confirm("이 기록을 정말 삭제하시겠습니까?")) return;

    const previousMilestones = [...milestones];

    setMilestones((prev) => prev.filter((m) => m.number !== issueNumber));

    try {
      await deleteMilestone(issueNumber);
    } catch (err) {
      setMilestones(previousMilestones);
      alert("삭제 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Delete failed:", err);
    }
  };

  const editItem = async (issueNumber: number, data: MilestoneInput) => {
    const previousMilestones = [...milestones];

    setMilestones((prev) =>
      prev.map((m) => (m.number === issueNumber ? { ...m, ...data, title: data.title } : m))
    );

    try {
      await updateMilestone(issueNumber, data);
    } catch (err) {
      setMilestones(previousMilestones.sort(sortMilestones));
      alert("수정에 실패했습니다.");
    }
  };

  const groupedMilestones = useMemo(() => {
    const groups: { [key: number]: Milestone[] } = {};

    filteredMilestones.forEach((m) => {
      const decade = Math.floor(m.age / 10) * 10;
      if (!groups[decade]) groups[decade] = [];
      groups[decade].push(m);
    });

    return Object.keys(groups)
      .map(Number)
      .sort((a, b) => a - b)
      .map((decade) => ({
        decade,
        items: groups[decade]
      }));
  }, [filteredMilestones]);

  const stats = useMemo(() => {
    if (milestones.length === 0) return null;

    const total = milestones.length;
    const highImpactCount = milestones.filter((m) => m.isHighImpact).length;

    const ageCounts: { [key: number]: number } = {};
    milestones.forEach((m) => {
      ageCounts[m.age] = (ageCounts[m.age] || 0) + 1;
    });
    const mostActiveAge = Object.keys(ageCounts).reduce((a, b) =>
      ageCounts[Number(a)] > ageCounts[Number(b)] ? a : b
    );

    return { total, highImpactCount, mostActiveAge };
  }, [milestones]);

  const randomMilestone = useMemo(() => {
    if (milestones.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * milestones.length);
    return milestones[randomIndex];
  }, [milestones]);

  return {
    milestones,
    groupedMilestones,
    filteredMilestones,
    loading,
    error,
    categories,
    filters: { selectedCategory, showHighImpact, searchQuery },
    stats,
    randomMilestone,
    actions: {
      setSelectedCategory,
      setShowHighImpact,
      setSearchQuery,
      addMilestone,
      deleteItem,
      editItem
    }
  };
};
