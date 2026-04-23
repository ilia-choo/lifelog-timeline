import { useMilestones } from "../hooks";
import { useDarkMode } from "../utils/use-dark-mode";
import { SiteHeader, SiteFooter, FilterBar, TimelineList, LoadingScreen } from "../components";

const Home = () => {
  const { filteredMilestones, loading, error, categories, filters, actions } = useMilestones();
  const { isDark, toggle } = useDarkMode();

  if (loading) {
    return <LoadingScreen />;
  }

  const handleToggleHighImpact = () => {
    actions.setShowHighImpact(!filters.showHighImpact);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-500 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <SiteHeader isDark={isDark} toggle={toggle} />

        <main>
          <FilterBar
            categories={categories}
            selectedCategory={filters.selectedCategory}
            onSelectCategory={actions.setSelectedCategory}
            showHighImpact={filters.showHighImpact}
            onToggleHighImpact={handleToggleHighImpact}
            searchQuery={filters.searchQuery}
            onSearchChange={actions.setSearchQuery}
          />

          <TimelineList milestones={filteredMilestones} error={error} />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
};

export default Home;
