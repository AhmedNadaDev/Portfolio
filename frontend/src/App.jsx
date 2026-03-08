import { useState, useRef, useCallback, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import IntroLoader from "@/components/IntroLoader.jsx";

const ParticlesBackground = lazy(() => import("@/components/ParticlesBackground.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const pageRef = useRef(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {!introComplete && (
        <IntroLoader onComplete={handleIntroComplete} pageRef={pageRef} />
      )}
      {introComplete && (
        <Suspense fallback={null}>
          <ParticlesBackground />
        </Suspense>
      )}
      <div ref={pageRef}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
