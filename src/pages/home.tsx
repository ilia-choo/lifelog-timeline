import { useEffect, useState } from "react";
import { Milestone } from "../types";
import { getMilestones } from "../services";
import { TimelineItem } from "../components";

const Home = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-surface-600 font-medium bg-surface-50">
        인생 기록 불러오는 중...
      </div>
    );

  return (
    <div className="min-h-screen bg-surface-50 py-12 px-4">
      <header className="max-w-2xl mx-auto mb-12 text-center md:text-left">
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          LifeLog <span className="text-surface-900">Timeline</span>
        </h1>
        <p className="text-surface-600 mt-2 italic font-light">
          "기록하지 않은 삶은 내 것이 아니다."
        </p>
      </header>

      <main className="max-w-2xl mx-auto relative">
        {error ? (
          <div className="text-center py-20 text-red-500 bg-white rounded-xl border border-red-100 shadow-sm">
            {error}
          </div>
        ) : milestones.length > 0 ? (
          <div className="timeline-list">
            {milestones.map((m) => (
              <TimelineItem key={m.id} milestone={m} />
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-surface-600 bg-white rounded-xl border border-surface-100 shadow-sm">
            등록된 인생 기록이 없습니다.
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;
