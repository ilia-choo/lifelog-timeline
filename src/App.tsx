import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Timeline } from "@/pages";
import { MilestoneProvider, useMilestoneContext } from "@/contexts";
import { LoadingScreen } from "@/components";

function AppContent() {
  const { loading } = useMilestoneContext();

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <MilestoneProvider>
      <AppContent />
    </MilestoneProvider>
  );
}

export default App;
