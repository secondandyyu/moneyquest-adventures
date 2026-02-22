import { useGame } from "@/context/GameContext";
import { categories } from "@/data/gameData";
import { motion } from "framer-motion";
import { BookOpen, Star, CheckCircle2, Lightbulb } from "lucide-react";

export default function Review() {
  const { isScenarioCompleted, getScenarioResult } = useGame();

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
        <h1 className="text-2xl font-black mb-2">No Completed Scenarios Yet</h1>
        <p className="text-muted-foreground">
          Play some scenarios and come back here to review what you've learned!
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-6 text-center">Review</h1>
      <p className="text-center text-muted-foreground mb-8 font-semibold">
        {completedItems.length} scenario{completedItems.length !== 1 ? "s" : ""} completed
      </p>

      <div className="space-y-4">
        {completedItems.map(({ category, level, scenario, result }, i) => {
          const chosenChoice = scenario.choices[result.choiceIndex];
          const bestChoice = scenario.choices.find((c) => c.quality === "best");

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              className="bg-card border-2 border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-success" />
                <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wide">
                  {category.name.split("'")[0]} — {level.title}
                </span>
              </div>

              <p className="text-sm font-semibold leading-relaxed mb-3">{scenario.context}</p>

              <div className="space-y-2 mb-3">
                <div className="text-xs font-extrabold text-muted-foreground">Your choice:</div>
                <div className={`text-sm p-3 rounded-xl border-2 ${
                  chosenChoice.quality === "best"
                    ? "border-success bg-success/5"
                    : chosenChoice.quality === "okay"
                    ? "border-warning bg-warning/5"
                    : "border-danger bg-danger/5"
                }`}>
                  {chosenChoice.text}
                  <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold">
                    <Star size={10} className="text-xp fill-xp" /> +{result.xpEarned} XP
                  </span>
                </div>
              </div>

              {bestChoice && chosenChoice.quality !== "best" && (
                <div className="mb-3">
                  <div className="text-xs font-extrabold text-success mb-1">Best choice was:</div>
                  <p className="text-sm text-muted-foreground">{bestChoice.text}</p>
                </div>
              )}

              <div className="bg-primary/5 rounded-xl p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Lightbulb size={12} className="text-primary" />
                  <span className="text-xs font-extrabold text-primary">Explanation</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{scenario.justification}</p>
              </div>

              {scenario.definition && (
                <div className="bg-secondary/30 rounded-xl p-3 mt-2">
                  <span className="text-xs font-extrabold text-secondary-foreground">Definition: </span>
                  <span className="text-xs text-muted-foreground">{scenario.definition}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
