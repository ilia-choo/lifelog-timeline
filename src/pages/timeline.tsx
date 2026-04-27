import { useEffect, useState } from "react";
import { useMilestoneContext } from "@/contexts";
import { useDarkMode } from "@/hooks";
import { SiteHeader, SiteFooter } from "@/components";
import { FilterBar, TimelineList, MilestoneForm } from "@/components/timeline";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const Timeline = () => {
  const { categories, filters, actions } = useMilestoneContext();
  const { isDark, toggle } = useDarkMode();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { loading } = useMilestoneContext();
  const [searchParams] = useSearchParams();
  const targetNumber = searchParams.get("target");

  useEffect(() => {
    if (!loading && targetNumber) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`milestone-${targetNumber}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, targetNumber]);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-500 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <SiteHeader isDark={isDark} toggle={toggle} />

        <main>
          <div className="mb-12">
            {!isFormOpen ? (
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full py-4 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-2xl text-surface-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-bold"
              >
                <Plus className="w-5 h-5" /> 새로운 기록 남기기
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute -top-3 -right-3 p-1 bg-white dark:bg-surface-800 rounded-full border shadow-sm z-20"
                >
                  <X className="w-4 h-4" />
                </button>
                <MilestoneForm
                  onSubmit={actions.addMilestone}
                  onCancel={() => setIsFormOpen(false)}
                />
              </div>
            )}
          </div>

          <FilterBar
            categories={categories}
            selectedCategory={filters.selectedCategory}
            onSelectCategory={actions.setSelectedCategory}
            showHighImpact={filters.showHighImpact}
            onToggleHighImpact={() => actions.setShowHighImpact(!filters.showHighImpact)}
            searchQuery={filters.searchQuery}
            onSearchChange={actions.setSearchQuery}
          />

          <TimelineList />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
};
