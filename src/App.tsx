import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider, useGame } from "@/context/GameContext";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Levels from "./pages/Levels";
import GamePlay from "./pages/GamePlay";
import About from "./pages/About";
import Review from "./pages/Review";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppShell() {
  const { state } = useGame();

  const themeClass = state.activeTheme !== "default" ? `theme-${state.activeTheme}` : "";
  const fontClass = state.activeFont !== "nunito" ? `font-${state.activeFont}` : "";

  return (
    <div className={`${themeClass} ${fontClass} min-h-screen bg-background text-foreground`}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/play/:levelId" element={<GamePlay />} />
          <Route path="/about" element={<About />} />
          <Route path="/review" element={<Review />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <GameProvider>
        <AppShell />
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
