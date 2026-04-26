import { useEffect, useMemo, useState } from "react";
import { Milestone } from "@/types";
import { createMilestone, getMilestones } from "@/services";
import { apiClient } from "@/apis/apiClient";

export const useMilestones = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHighImpact, setShowHighImpact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const data = await getMilestones();
      setMilestones(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const addMilestone = async (data: any) => {
    const newEntry = await createMilestone(data);
    setMilestones((prev) => [...prev, newEntry].sort((a, b) => a.age - b.age));
    return newEntry;
  };

  const deleteItem = async (issueNumber: number) => {
    if (!window.confirm("이 기록을 정말 삭제하시겠습니까?")) return;

    const previousMilestones = [...milestones];

    setMilestones((prev) => prev.filter((m) => m.number !== issueNumber));

    try {
      await apiClient.patch(`/${issueNumber}`, { state: "closed" });
    } catch (err) {
      setMilestones(previousMilestones);
      alert("삭제 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Delete failed:", err);
    }
  };

  return {
    milestones,
    filteredMilestones,
    loading,
    error,
    categories,
    filters: { selectedCategory, showHighImpact, searchQuery },
    actions: { setSelectedCategory, setShowHighImpact, setSearchQuery, addMilestone, deleteItem }
  };
};
