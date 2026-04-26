import { useMilestoneContext } from "@/contexts";
import { useDarkMode } from "@/hooks";
import { SiteHeader, SiteFooter, TimelineItem } from "@/components";
import { Dashboard } from "@/components/timeline/dashboard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  const { milestones, stats, randomMilestone } = useMilestoneContext();
  const { isDark, toggle } = useDarkMode();

  const highImpactItems = milestones.filter((m) => m.isHighImpact).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-500 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <SiteHeader isDark={isDark} toggle={toggle} />

        <main className="space-y-12">
          <Dashboard stats={stats} randomItem={randomMilestone} />

          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Life Highlights
                </h2>
              </div>
              <Link
                to="/timeline"
                className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
              >
                전체 타임라인 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {highImpactItems.length > 0 ? (
              <div className="space-y-4">
                {highImpactItems.map((item) => (
                  <TimelineItem key={item.id} milestone={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-surface-900 rounded-3xl border border-dashed">
                <p className="text-surface-500 italic">아직 기록된 특별한 순간이 없습니다.</p>
              </div>
            )}
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
};
