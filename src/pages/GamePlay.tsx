import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { getLevelById } from "@/data/gameData";
import type { Scenario, Choice, ChoiceQuality } from "@/data/gameData";
import { scenarioIllustrations, introImages, introTexts } from "@/data/scenarioIllustrations";
import GuideAvatar from "@/components/GuideAvatar";
import swanImg from "@/assets/swan-guide.png";
import beaverImg from "@/assets/beaver-guide.png";
import dogImg from "@/assets/dog-guide.png";
import { Star, ArrowLeft, ArrowRight, Trophy, BookOpen, Lightbulb } from "lucide-react";

const guideImages: Record<string, string> = { swan: swanImg, beaver: beaverImg, dog: dogImg };

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

export default function GamePlay() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { completeScenario, isScenarioCompleted, getScenarioResult, state, isLevelCompleted, hasPowerUp } = useGame();

  const result = useMemo(() => getLevelById(levelId || ""), [levelId]);

  // Determine if this is a replay (level was already completed when we entered)
  const [isReplay] = useState(() => !!levelId && isLevelCompleted(levelId));

  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [usedSecondChance, setUsedSecondChance] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, { choiceIndex: number; xpEarned: number }>>({});

  // Show intro page for Level 1 of each category
  const isFirstLevel = result ? result.category.levels[0]?.id === result.level.id : false;
  const [showIntro, setShowIntro] = useState(() => isFirstLevel && !isReplay);

  if (!result) {
    return (
      <div className="container py-12 text-center">
        <p className="text-xl font-bold">Level not found!</p>
        <Link to="/levels" className="text-primary font-bold mt-4 inline-block">
          Back to Levels
        </Link>
      </div>
    );
  }

  const { category, level } = result;
  const scenario = level.scenarios[currentScenarioIdx];
  const totalScenarios = level.scenarios.length;

  // In replay mode, use session answers; in first-play mode, use global state
  const isScenarioAnsweredThisSession = (sId: string) => !!sessionAnswers[sId];
  const currentScenarioAnswered = isReplay ? isScenarioAnsweredThisSession(scenario.id) : isScenarioCompleted(scenario.id);

  const handleChoice = (index: number, choice: Choice) => {
    if (currentScenarioAnswered || showResult) return;
    setSelectedChoice(index);
    setShowResult(true);
    setShowHint(false);
    if (isReplay) {
      setSessionAnswers((prev) => ({ ...prev, [scenario.id]: { choiceIndex: index, xpEarned: 0 } }));
    } else {
      completeScenario(scenario.id, index, choice.xp, choice.quality);
    }
  };

  const handleSecondChance = () => {
    if (usedSecondChance[scenario.id]) return;
    setUsedSecondChance((prev) => ({ ...prev, [scenario.id]: true }));
    setSelectedChoice(null);
    setShowResult(false);
  };

  const nextScenario = () => {
    if (currentScenarioIdx < totalScenarios - 1) {
      setCurrentScenarioIdx((i) => i + 1);
      setSelectedChoice(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setShowSummary(true);
    }
  };

  const prevScenario = () => {
    if (currentScenarioIdx > 0) {
      setCurrentScenarioIdx((i) => i - 1);
      setSelectedChoice(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  if (showSummary) {
    const sessionCompletedCount = isReplay
      ? Object.keys(sessionAnswers).length
      : level.scenarios.filter((s) => isScenarioCompleted(s.id)).length;
    const totalSessionXP = isReplay
      ? 0
      : level.scenarios.reduce((sum, s) => {
          const r = getScenarioResult(s.id);
          return sum + (r?.xpEarned || 0);
        }, 0);

    return (
      <div className="container py-12 px-4 max-w-lg mx-auto text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Trophy size={64} className="mx-auto text-xp mb-4" />
          <h1 className="text-3xl font-black mb-2">{isReplay ? "Review Complete!" : "Level Complete!"}</h1>
          <h2 className="text-xl font-bold text-muted-foreground mb-6">{level.title}</h2>

          <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6">
            {isReplay ? (
              <p className="text-sm text-muted-foreground">
                You reviewed all {totalScenarios} scenarios. No XP awarded on replay.
              </p>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="text-xp fill-xp" size={24} />
                  <span className="text-2xl font-black">{totalSessionXP}</span>
                  <span className="font-bold text-muted-foreground">XP earned</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {sessionCompletedCount}/{totalScenarios} scenarios completed
                </p>
              </>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              to="/levels"
              className="px-6 py-3 bg-muted text-foreground rounded-xl font-bold hover:bg-muted/80"
            >
              Back to Levels
            </Link>
            <Link
              to="/review"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90"
            >
              Review Answers
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Intro page for Level 1
  if (showIntro) {
    const guide = category.guide;
    const intro = introTexts[guide];
    const introImg = introImages[guide];

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full text-center"
        >
          <div className="rounded-2xl overflow-hidden border-2 border-border mb-6 bg-card shadow-lg">
            <img
              src={introImg}
              alt={`${guide} intro`}
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>

          <h1 className="text-3xl font-black mb-3">{intro.title}</h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-8 px-2">
            {intro.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowIntro(false)}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-extrabold text-lg hover:opacity-90 transition-opacity"
          >
            Let's Go! 🚀
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const activeChoice = currentScenarioAnswered
    ? (isReplay ? sessionAnswers[scenario.id]?.choiceIndex ?? null : getScenarioResult(scenario.id)?.choiceIndex ?? null)
    : selectedChoice;
  const isRevealed = currentScenarioAnswered || showResult;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="container flex items-center justify-between max-w-3xl mx-auto">
          <button onClick={() => navigate("/levels")} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} /> Back
          </button>

          {/* Progress bar */}
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                {currentScenarioIdx + 1}/{totalScenarios}
              </span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={false}
                  animate={{ width: `${((currentScenarioIdx + 1) / totalScenarios) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-extrabold">
            <Star className="text-xp fill-xp" size={16} />
            {state.xp.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div className="container py-8 px-4 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {/* Guide + Level info */}
            <div className="flex items-center gap-3 mb-4">
              <GuideAvatar src={guideImages[category.guide]} size="sm" />
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {level.title} — Scenario {currentScenarioIdx + 1}
                </p>
                <p className="font-extrabold text-sm">{level.topic}</p>
              </div>
            </div>

            {/* Scenario illustration */}
            {scenarioIllustrations[scenario.id] && (
            <div className="rounded-2xl overflow-hidden border-2 border-border mb-4 bg-card shadow-sm">
                <img
                  src={scenarioIllustrations[scenario.id]}
                  alt="Scenario illustration"
                  className="w-full object-contain"
                  style={{ filter: "saturate(0.85) contrast(0.95) brightness(1.02)" }}
                />
              </div>
            )}

            {/* Context story */}
            <div className="bg-card border-2 border-border rounded-2xl p-5 mb-4">
              <p className="text-base leading-relaxed font-semibold">{scenario.context}</p>
            </div>

            {/* Definition or Teaching */}
            {scenario.definition && (
              <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-primary" />
                  <span className="font-extrabold text-sm text-primary">Definition</span>
                </div>
                <p className="text-sm leading-relaxed">{scenario.definition}</p>
              </div>
            )}
            {scenario.teaching && (
              <div className="bg-secondary/50 border-2 border-secondary rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={16} className="text-secondary-foreground" />
                  <span className="font-extrabold text-sm text-secondary-foreground">Did You Know?</span>
                </div>
                <p className="text-sm leading-relaxed">{scenario.teaching}</p>
              </div>
            )}

            {/* Hint & Power-up buttons */}
            {!isRevealed && (
              <div className="flex gap-2 mb-3">
                {hasPowerUp("hint") && !showHint && (
                  <button
                    onClick={() => setShowHint(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-secondary/50 border border-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors"
                  >
                    🔍 Use Hint
                  </button>
                )}
              </div>
            )}

            {showHint && !isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/30 border border-secondary/50 rounded-xl p-3 mb-3"
              >
                <p className="text-xs font-bold text-secondary-foreground">
                  🔍 Hint: Look for the choice that shows the most responsible financial thinking.
                  {(() => {
                    const bestIdx = scenario.choices.findIndex(c => c.quality === "best");
                    const badIdx = scenario.choices.findIndex(c => c.quality === "bad");
                    return badIdx >= 0 ? ` Option ${String.fromCharCode(65 + badIdx)} might not be the best idea.` : "";
                  })()}
                </p>
              </motion.div>
            )}

            {/* Choices */}
            <div className="space-y-3 mb-4">
              <p className="font-extrabold text-sm text-muted-foreground">
                {scenario.isQuiz ? "Pick the correct answer:" : "What would you do?"}
              </p>
              {scenario.choices.map((choice, idx) => {
                const isSelected = activeChoice === idx;
                const revealed = isRevealed;

                return (
                  <motion.button
                    key={idx}
                    whileHover={!revealed ? { scale: 1.01 } : {}}
                    whileTap={!revealed ? { scale: 0.99 } : {}}
                    onClick={() => handleChoice(idx, choice)}
                    disabled={isRevealed}
                    className={`w-full text-left p-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                      revealed
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
                        {revealed && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-extrabold">{qualityLabels[choice.quality]}</span>
                            <span className="text-xs font-bold text-xp-foreground bg-xp/20 px-2 py-0.5 rounded-full">
                              +{choice.xp} XP{hasPowerUp("xp-booster") && !isReplay ? " (1.5×)" : ""}
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
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 mb-6"
              >
                <p className="font-extrabold text-primary mb-2">💡 Explanation</p>
                <p className="text-sm leading-relaxed">{scenario.justification}</p>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevScenario}
                disabled={currentScenarioIdx === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-xl font-bold text-sm bg-muted hover:bg-muted/80 disabled:opacity-30"
              >
                <ArrowLeft size={16} /> Previous
              </button>

              {isRevealed && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={nextScenario}
                  className="flex items-center gap-1 px-6 py-3 rounded-xl font-extrabold text-sm bg-primary text-primary-foreground hover:opacity-90"
                >
                  {currentScenarioIdx < totalScenarios - 1 ? (
                    <>
                      Next Scenario <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      Finish Level <Trophy size={16} />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
