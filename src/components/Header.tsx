import { Link, useLocation } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { Star, BookOpen, ShoppingBag, Info, Gamepad2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Gamepad2 },
  { path: "/levels", label: "Levels", icon: BookOpen },
  { path: "/review", label: "Review", icon: RotateCcw },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/about", label: "About", icon: Info },
];

export default function Header() {
  const { state } = useGame();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-primary">💰 MoneyQuest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
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

        <motion.div
          key={state.xp}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 bg-xp/20 text-xp-foreground px-4 py-2 rounded-full font-extrabold border-2 border-xp"
        >
          <Star className="text-xp fill-xp" size={18} />
          {state.xp.toLocaleString()} XP
        </motion.div>
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
