import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion, Choice, ChoiceQuality } from "@/data/gameData";
import { Star } from "lucide-react";

const qualityStyles: Record<ChoiceQuality, string> = {
  best: "border-success bg-success/10 hover:bg-success/20",
  okay: "border-warning bg-warning/10 hover:bg-warning/20",
  bad: "border-danger bg-danger/10 hover:bg-danger/20",
};

const qualityLabels: Record<ChoiceQuality, string> = {
  best: "🌟 Great Choice!",
  okay: "👍 Okay Choice",
  bad: "⚠️ Not the Best",
};

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (totalXP: number) => void;
  isReplay: boolean;
  hasPowerUp: boolean;
}

export default function QuizView({ questions, onComplete, isReplay, hasPowerUp }: QuizViewProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const question = questions[currentQ];

  const handleChoice = (idx: number, choice: Choice) => {
    if (showResult) return;
    setSelectedChoice(idx);
    setShowResult(true);
    if (!isReplay) {
      setTotalXP((prev) => prev + choice.xp);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelectedChoice(null);
      setShowResult(false);
    } else {
      onComplete(totalXP);
    }
  };

  return (
    <div className="space-y-4">
      {/* Question progress */}
      <div className="flex items-center gap-2 mb-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/60" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-bold text-muted-foreground">
        Question {currentQ + 1} of {questions.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question text */}
          <div className="bg-card border-2 border-border rounded-2xl p-5 mb-4">
            <p className="text-base leading-relaxed font-semibold">{question.text}</p>
          </div>

          {/* Choices */}
          <div className="space-y-3 mb-4">
            {question.choices.map((choice, idx) => {
              const isSelected = selectedChoice === idx;
              return (
                <motion.button
                  key={idx}
                  whileHover={!showResult ? { scale: 1.01 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                  onClick={() => handleChoice(idx, choice)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                    showResult
                      ? `${qualityStyles[choice.quality]} ${isSelected ? "ring-2 ring-offset-2 ring-foreground/20" : ""}`
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center font-extrabold text-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1">
                      <p>{choice.text}</p>
                      {showResult && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-extrabold">{qualityLabels[choice.quality]}</span>
                          <span className="text-xs font-bold text-xp-foreground bg-xp/20 px-2 py-0.5 rounded-full">
                            +{choice.xp} XP{hasPowerUp && !isReplay ? " (1.5×)" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Justification */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 mb-4"
            >
              <p className="font-extrabold text-primary mb-2">💡 Explanation</p>
              <p className="text-sm leading-relaxed">{question.justification}</p>
            </motion.div>
          )}

          {/* Next button */}
          {showResult && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={handleNext}
              className="flex items-center gap-1 px-6 py-3 rounded-xl font-extrabold text-sm bg-primary text-primary-foreground hover:opacity-90 ml-auto"
            >
              {currentQ < questions.length - 1 ? (
                <>Next Question →</>
              ) : (
                <>
                  Done <Star size={16} />
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
