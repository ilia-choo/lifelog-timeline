import { useCallback, useEffect, useMemo, useState } from "react";
import { Milestone, MilestoneInput } from "@/types";
import { createMilestone, deleteMilestone, getMilestones, updateMilestone } from "@/services";
import {
  filterMilestones,
  getMilestoneCategories,
  getMilestoneStats,
  getRandomMilestone,
  getSortedMilestones,
  groupMilestonesByDecade
} from "@/utils";

export const useMilestones = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHighImpact, setShowHighImpact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const data = await getMilestones();
      setMilestones(getSortedMilestones(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "기록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = useMemo(() => getMilestoneCategories(milestones), [milestones]);

  const filteredMilestones = useMemo(
    () => filterMilestones(milestones, { selectedCategory, showHighImpact, searchQuery }),
    [milestones, selectedCategory, showHighImpact, searchQuery]
  );

  const addMilestone = async (data: MilestoneInput) => {
    const newEntry = await createMilestone(data);
    setMilestones((prev) => getSortedMilestones([...prev, newEntry]));
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
      setMilestones(getSortedMilestones(previousMilestones));
      alert("수정에 실패했습니다.");
    }
  };

  const groupedMilestones = useMemo(
    () => groupMilestonesByDecade(filteredMilestones),
    [filteredMilestones]
  );

  const stats = useMemo(() => getMilestoneStats(milestones), [milestones]);

  const randomMilestone = useMemo(() => getRandomMilestone(milestones), [milestones]);

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
