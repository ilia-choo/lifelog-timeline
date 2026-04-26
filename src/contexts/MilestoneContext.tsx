import { createContext, useContext, ReactNode } from "react";
import { useMilestones } from "@/hooks/use-milestones.hook";

type MilestoneContextType = ReturnType<typeof useMilestones>;

const MilestoneContext = createContext<MilestoneContextType | null>(null);

export const MilestoneProvider = ({ children }: { children: ReactNode }) => {
  const milestoneData = useMilestones();
  return <MilestoneContext.Provider value={milestoneData}>{children}</MilestoneContext.Provider>;
};

export const useMilestoneContext = () => {
  const context = useContext(MilestoneContext);
  if (!context) throw new Error("MilestoneProvider 내에서 사용해야 합니다.");
  return context;
};
