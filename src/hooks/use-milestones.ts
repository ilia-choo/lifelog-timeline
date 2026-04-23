import { useEffect, useMemo, useState } from "react";
import { Milestone } from "../types";
import { getMilestones } from "../services";

export const useMilestones = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHighImpact, setShowHighImpact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getMilestones()
      .then((data) => {
        setMilestones(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
        m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesImpact && matchesSearch;
    });
  }, [milestones, selectedCategory, showHighImpact, searchQuery]);

  return {
    milestones,
    filteredMilestones,
    loading,
    error,
    categories,
    filters: {
      selectedCategory,
      showHighImpact,
      searchQuery
    },
    actions: {
      setSelectedCategory,
      setShowHighImpact,
      setSearchQuery
    }
  };
};
