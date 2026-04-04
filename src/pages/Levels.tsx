import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { categories } from "@/data/gameData";
import GuideAvatar from "@/components/GuideAvatar";
import swanImg from "@/assets/scenarios/swan-intro.png";
import beaverImg from "@/assets/scenarios/beaver-intro.png";
import dogImg from "@/assets/scenarios/dog-intro.png";
import { Lock, CheckCircle2, Circle, ChevronRight } from "lucide-react";

const guideImages: Record<string, string> = { swan: swanImg, beaver: beaverImg, dog: dogImg };

export default function Levels() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || categories[0].id;
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const { isCategoryUnlocked, isLevelUnlocked, isLevelCompleted, isScenarioCompleted } = useGame();

  const cat = categories.find((c) => c.id === selectedCat) || categories[0];
  const catUnlocked = isCategoryUnlocked(cat.id);

  return (
    <div className="container py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-6 text-center">Levels</h1>

      {/* Category tabs */}
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {categories.map((c) => {
          const unlocked = isCategoryUnlocked(c.id);
          return (
            <button
              key={c.id}
              onClick={() => unlocked && setSelectedCat(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all ${
                selectedCat === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : unlocked
                  ? "border-border bg-card hover:border-primary/50"
                  : "border-border bg-muted/50 opacity-50 cursor-not-allowed"
              }`}
            >
              <img src={guideImages[c.guide]} alt={c.name} className="w-10 h-10 object-contain" />
              {c.name.split("'")[0]}
              {!unlocked && <Lock size={12} />}
            </button>
          );
        })}
      </div>

      {/* Category header */}
      <div className="flex items-center gap-4 mb-6">
        <GuideAvatar src={guideImages[cat.guide]} size="md" />
        <div>
          <h2 className="text-xl font-extrabold">{cat.name}</h2>
          <p className="text-sm text-muted-foreground">{cat.description}</p>
        </div>
      </div>

      {!catUnlocked ? (
        <div className="text-center py-12 bg-muted/50 rounded-2xl border-2 border-dashed border-border">
          <Lock size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="font-bold text-lg">Locked</p>
          <p className="text-muted-foreground">Complete all levels in the previous category to unlock</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cat.levels.map((level, i) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);
            const scenariosCompleted = level.scenarios.filter((s) => isScenarioCompleted(s.id)).length;

            return (
              <motion.div
                key={level.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
              >
                {unlocked ? (
                  <Link
                    to={`/play/${level.id}`}
                    
                    className={`block rounded-2xl border-2 p-5 transition-all hover:shadow-lg hover:scale-[1.01] ${
                      completed ? "border-success bg-success/5" : "border-primary bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {completed ? (
                          <CheckCircle2 className="text-success" size={24} />
                        ) : (
                          <Circle className="text-primary" size={24} />
                        )}
                        <div>
                          <h3 className="font-extrabold text-lg">
                            Level {i + 1}: {level.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{level.topic}</p>
                          <p className="text-xs font-bold text-primary mt-1">
                            {scenariosCompleted}/{level.scenarios.length} scenarios
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground" size={20} />
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-border p-5 opacity-50">
                    <div className="flex items-center gap-3">
                      <Lock size={24} className="text-muted-foreground" />
                      <div>
                        <h3 className="font-extrabold text-lg">
                          Level {i + 1}: {level.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Complete the previous level to unlock
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
