import { useGame } from "@/context/GameContext";

interface GuideAvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

export default function GuideAvatar({ src, alt = "Guide", size = "sm" }: GuideAvatarProps) {
  const { state } = useGame();
  const cosmetics = state.activeCosmetics;

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]}`}>
      <img src={src} alt={alt} className="w-full h-full object-contain relative z-10" />
      
      {/* Crown */}
      {cosmetics.includes("crown") && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-lg drop-shadow-md" style={{ fontSize: size === "lg" ? "1.8rem" : size === "md" ? "1.4rem" : "1.1rem" }}>
          👑
        </span>
      )}

      {/* Glasses */}
      {cosmetics.includes("glasses") && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-sm" style={{ fontSize: size === "lg" ? "1.6rem" : size === "md" ? "1.2rem" : "0.9rem" }}>
          🕶️
        </span>
      )}

      {/* Cape glow */}
      {cosmetics.includes("cape") && (
        <div className="absolute inset-0 z-0 rounded-full animate-pulse" style={{
          background: "radial-gradient(circle, hsl(0 80% 55% / 0.25) 0%, transparent 70%)",
        }} />
      )}

      {/* Sparkle trail */}
      {cosmetics.includes("sparkle") && (
        <>
          <span className="absolute -top-1 -right-1 z-20 animate-ping opacity-75" style={{ fontSize: size === "lg" ? "0.8rem" : "0.5rem" }}>✨</span>
          <span className="absolute -bottom-1 -left-1 z-20 animate-ping opacity-75" style={{ fontSize: size === "lg" ? "0.7rem" : "0.45rem", animationDelay: "0.5s" }}>✨</span>
          <span className="absolute top-0 -left-2 z-20 animate-ping opacity-60" style={{ fontSize: size === "lg" ? "0.6rem" : "0.4rem", animationDelay: "1s" }}>✨</span>
        </>
      )}
    </div>
  );
}
