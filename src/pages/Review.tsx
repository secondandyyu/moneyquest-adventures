import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { categories } from "@/data/gameData";
import { scenarioIllustrations } from "@/data/scenarioIllustrations";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Star, CheckCircle2, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

export default function Review() {
  const { isScenarioCompleted, getScenarioResult } = useGame();
  const [currentPage, setCurrentPage] = useState(0);

  const completedItems = categories.flatMap((cat) =>
    cat.levels.flatMap((level) =>
      level.scenarios
        .filter((s) => isScenarioCompleted(s.id))
        .map((scenario) => ({
          category: cat,
          level,
          scenario,
          result: getScenarioResult(scenario.id)!,
        }))
    )
  );

  if (completedItems.length === 0) {
    return (
      <div className="container py-12 px-4 text-center max-w-lg mx-auto">
        <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-black mb-2">Your Review Book is Empty</h1>
        <p className="text-muted-foreground">
          Play some scenarios and come back here to read your adventure journal!
        </p>
      </div>
    );
  }

  const totalPages = completedItems.length;
  const item = completedItems[currentPage];
  const { category, level, scenario, result } = item;
  const chosenChoice = scenario.choices[result.choiceIndex];
  const bestChoice = scenario.choices.find((c) => c.quality === "best");

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-black mb-2 text-center">📖 Review Book</h1>
      <p className="text-sm text-muted-foreground font-bold mb-6">
        {totalPages} page{totalPages !== 1 ? "s" : ""} of adventure
      </p>

      {/* Book container */}
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: -10 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 10 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Book page */}
            <div
              className="rounded-2xl border-2 border-border overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(45 40% 96%), hsl(40 30% 93%))",
                boxShadow: "4px 4px 15px rgba(0,0,0,0.1), inset -2px 0 6px rgba(0,0,0,0.03)",
              }}
            >
              {/* Page header ribbon */}
              <div className="bg-primary/10 border-b border-border/50 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-success" />
                  <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
                    {category.name.split("'")[0]} — {level.title}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-muted-foreground">
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>

              {/* Page content */}
              <div className="p-6 md:p-8 space-y-5">
                {/* Scenario illustration */}
                {scenarioIllustrations[scenario.id] && (
                  <div className="rounded-xl overflow-hidden border-2 border-border/30 shadow-sm">
                    <img
                      src={scenarioIllustrations[scenario.id]}
                      alt="Scenario illustration"
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  </div>
                )}

                {/* Story context */}
                <div className="relative">
                  <span className="text-5xl font-black text-primary/20 absolute -top-3 -left-1 leading-none">"</span>
                  <p className="text-base leading-relaxed font-semibold pl-6 italic text-card-foreground">
                    {scenario.context}
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border/60" />
                  <Star size={12} className="text-xp fill-xp" />
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                {/* Your choice */}
                <div>
                  <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide mb-2">
                    Your Choice
                  </p>
                  <div
                    className={`text-sm p-4 rounded-xl border-2 ${
                      chosenChoice.quality === "best"
                        ? "border-success bg-success/5"
                        : chosenChoice.quality === "okay"
                        ? "border-warning bg-warning/5"
                        : "border-danger bg-danger/5"
                    }`}
                  >
                    {chosenChoice.text}
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold">
                      <Star size={10} className="text-xp fill-xp" /> +{result.xpEarned} XP
                    </span>
                  </div>
                </div>

                {/* Best choice (if different) */}
                {bestChoice && chosenChoice.quality !== "best" && (
                  <div>
                    <p className="text-xs font-extrabold text-success mb-1">✅ Best Choice Was:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{bestChoice.text}</p>
                  </div>
                )}

                {/* Explanation */}
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb size={14} className="text-primary" />
                    <span className="text-xs font-extrabold text-primary">Lesson Learned</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{scenario.justification}</p>
                </div>

                {/* Definition */}
                {scenario.definition && (
                  <div className="bg-secondary/20 rounded-xl p-4 border border-secondary/30">
                    <span className="text-xs font-extrabold text-secondary-foreground">📚 Definition: </span>
                    <span className="text-xs text-muted-foreground">{scenario.definition}</span>
                  </div>
                )}
              </div>

              {/* Page footer - decorative */}
              <div className="px-6 py-3 border-t border-border/30 flex justify-center">
                <span className="text-xs text-muted-foreground/50 font-bold italic">~ MoneyQuest Review Book ~</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Page navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-card border-2 border-border hover:border-primary/50 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={16} /> Previous Page
          </button>

          {/* Page dots */}
          <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
            {completedItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentPage ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 transition-all"
          >
            Next Page <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
