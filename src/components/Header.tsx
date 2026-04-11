import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { categories } from "@/data/gameData";
import { Star, BookOpen, ShoppingBag, Info, Gamepad2, RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/assets/andy-logo.png";
import swanImg from "@/assets/scenarios/swan-intro-v2.png";
import beaverImg from "@/assets/scenarios/beaver-intro.png";
import dogImg from "@/assets/scenarios/dog-intro.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { path: "/", label: "Home", icon: Gamepad2 },
  { path: "/levels", label: "Levels", icon: BookOpen },
  { path: "/review", label: "Review", icon: RotateCcw },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/about", label: "About", icon: Info },
];

const guideImages: Record<string, string> = {
  swan: swanImg,
  beaver: beaverImg,
  dog: dogImg,
};

export default function Header() {
  const { state, resetProgress, isLevelCompleted } = useGame();
  const location = useLocation();
  const navigate = useNavigate();

  const totalLevels = categories.reduce((sum, cat) => sum + cat.levels.length, 0);
  const completedLevels = categories.reduce(
    (sum, cat) => sum + cat.levels.filter((l) => isLevelCompleted(l.id)).length,
    0
  );

  const handleReset = () => {
    resetProgress();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container relative flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="MoneyQuest" className="h-14" />
        </Link>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                {categoryProgress.map((cp) => (
                  <div key={cp.id} className="flex items-center gap-1">
                    <img
                      src={guideImages[cp.guide]}
                      alt={cp.guide}
                      className="w-8 h-8 object-contain"
                    />
                    <div className="flex items-center gap-0.5 text-xs font-bold text-muted-foreground">
                      <Trophy size={12} className="text-primary" />
                      {cp.completed}/{cp.total}
                    </div>
                  </div>
                ))}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Levels Completed</p>
            </TooltipContent>
          </Tooltip>

          <Link to="/shop">
            <motion.div
              key={state.xp}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 bg-xp/20 text-xp-foreground px-4 py-2 rounded-full font-extrabold border-2 border-xp cursor-pointer hover:bg-xp/30 transition-colors"
            >
              <Star className="text-xp fill-xp" size={18} />
              {state.xp.toLocaleString()} XP
            </motion.div>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Reset Progress"
              >
                <RotateCcw size={16} />
                <span className="hidden md:inline">Reset</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset All Progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will erase all your XP, completed scenarios, purchased items, and achievements. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex justify-around border-t border-border py-2 bg-card">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 text-xs font-bold ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
