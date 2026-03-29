import swanImg from "@/assets/scenarios/swan-intro.png";
import beaverImg from "@/assets/scenarios/beaver-intro.png";
import dogImg from "@/assets/scenarios/dog-intro.png";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container py-12 px-4 max-w-2xl mx-auto">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-3xl font-black mb-6 text-center">About MoneyQuest</h1>

        <div className="space-y-6">
          <section className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-3">🎮 What is MoneyQuest?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              MoneyQuest is a story-based, choice-driven game that teaches financial literacy to kids aged 9–12.
              Through fun scenarios and lovable animal guides, players learn real-world money skills like saving,
              budgeting, investing, and giving back — all while earning XP and unlocking new adventures!
            </p>
          </section>

          <section className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-3">💡 Why was it made?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Financial literacy is one of the most important life skills, yet it's rarely taught in schools.
              MoneyQuest was created to fill that gap by making money concepts fun, relatable, and
              memorable for young learners through interactive storytelling.
            </p>
          </section>

          <section className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-3">📅 When was it made?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              MoneyQuest was designed and developed in 2026 as an educational project to help
              kids build smart money habits early in life.
            </p>
          </section>

          <section className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-3">🎯 Goals</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Build financial literacy and confidence in young learners
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Teach smart decision-making through real-life scenarios
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Make learning about money fun and engaging through gamification
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Encourage saving, budgeting, and responsible spending habits
              </li>
            </ul>
          </section>

          <section className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-3">🐾 Meet Your Guides</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { img: swanImg, name: "Swan", desc: "Corporate career guide" },
                { img: beaverImg, name: "Beaver", desc: "Builder & planner guide" },
                { img: dogImg, name: "Dog", desc: "Loyal business helper" },
              ].map((g) => (
                <div key={g.name} className="text-center">
                  <img src={g.img} alt={g.name} className="w-36 h-36 mx-auto object-contain mb-2" />
                  <p className="font-extrabold text-sm">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-3">🔒 Privacy</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              MoneyQuest stores your progress locally on your device using your browser's storage.
              We don't collect any personal information, and there are no ads or external trackers.
              Your data stays on your device — safe and private!
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
