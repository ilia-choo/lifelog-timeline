import { useState } from "react";
import { useMilestones, useDarkMode } from "@/hooks";
import {
  SiteHeader,
  SiteFooter,
  FilterBar,
  TimelineList,
  LoadingScreen,
  MilestoneForm
} from "@/components";
import { Plus, X } from "lucide-react";

const Home = () => {
  const { filteredMilestones, loading, error, categories, filters, actions } = useMilestones();
  const { isDark, toggle } = useDarkMode();
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-500 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto relative">
        <SiteHeader isDark={isDark} toggle={toggle} />

        <main className="relative">
          <FilterBar
            categories={categories}
            selectedCategory={filters.selectedCategory}
            onSelectCategory={actions.setSelectedCategory}
            showHighImpact={filters.showHighImpact}
            onToggleHighImpact={() => actions.setShowHighImpact(!filters.showHighImpact)}
            searchQuery={filters.searchQuery}
            onSearchChange={actions.setSearchQuery}
          />

          <div className="mb-12">
            {!isFormOpen ? (
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full py-4 border-2 border-dashed border-surface-200 dark:border-surface-800 rounded-2xl text-surface-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-bold"
              >
                <Plus className="w-5 h-5" />
                새로운 인생 기록 남기기
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute -top-3 -right-3 p-1.5 bg-surface-100 dark:bg-surface-800 rounded-full border border-surface-200 dark:border-surface-700 z-10 hover:bg-red-50 hover:text-red-500 transition-colors"
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

          <TimelineList milestones={filteredMilestones} error={error} />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
};

export default Home;
