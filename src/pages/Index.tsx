import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { categories } from "@/data/gameData";
import GuideAvatar from "@/components/GuideAvatar";
import swanImg from "@/assets/swan-guide.png";
import beaverImg from "@/assets/beaver-guide.png";
import dogImg from "@/assets/dog-guide.png";
import { Lock, ChevronRight, Star } from "lucide-react";
import logoImg from "@/assets/moneyquest-logo.png";

const guideImages: Record<string, string> = { swan: swanImg, beaver: beaverImg, dog: dogImg };

export default function Index() {
  const { state, isCategoryUnlocked, getCategoryProgress } = useGame();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/30 to-accent/20 py-16 px-4">
        <div className="container text-center max-w-2xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-black text-foreground mb-4"
          >
            💰 MoneyQuest
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-semibold mb-8"
          >
            Learn money skills through epic adventures with your animal guides!
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/levels"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-extrabold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start Playing <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12 px-4">
        <h2 className="text-2xl font-black text-center mb-8">Choose Your Adventure</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat, i) => {
            const unlocked = isCategoryUnlocked(cat.id);
            const progress = getCategoryProgress(cat.id);
            return (
              <motion.div
                key={cat.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to={unlocked ? `/levels?category=${cat.id}` : "#"}
                  className={`block rounded-2xl border-2 p-6 text-center transition-all ${
                    unlocked
                      ? "border-primary bg-card hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                      : "border-border bg-muted/50 opacity-60 cursor-not-allowed"
                  }`}
                  onClick={(e) => !unlocked && e.preventDefault()}
                >
                  <motion.div
                    animate={unlocked ? { y: [0, -8, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mx-auto mb-4"
                  >
                    <GuideAvatar src={guideImages[cat.guide]} size="lg" />
                  </motion.div>
                  <h3 className="text-xl font-extrabold mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                  {unlocked ? (
                    <div className="text-xs font-bold text-primary">
                      {progress.completed}/{progress.total} scenarios completed
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 text-sm font-bold text-muted-foreground">
                      <Lock size={14} />
                      Complete previous category to unlock
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-12 px-4">
        <div className="bg-card border-2 border-border rounded-2xl p-6 max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="text-xp fill-xp" size={24} />
            <span className="text-3xl font-black">{state.xp.toLocaleString()}</span>
            <span className="text-lg font-bold text-muted-foreground">XP</span>
          </div>
          <p className="text-sm text-muted-foreground font-semibold">
            Keep playing to earn XP and unlock new adventures!
          </p>
        </div>
      </section>
    </div>
  );
}
