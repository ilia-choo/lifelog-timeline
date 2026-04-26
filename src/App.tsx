import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Timeline } from "@/pages";
import { MilestoneProvider } from "@/contexts";

function App() {
  return (
    <MilestoneProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </MilestoneProvider>
  );
}

export default App;
