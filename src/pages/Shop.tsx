import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Star, Palette, Type, Sparkles, Check, Zap } from "lucide-react";
import { toast } from "sonner";

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: "theme" | "font" | "cosmetic";
  value: string;
  icon: typeof Palette;
  preview?: string;
}

const shopItems: ShopItem[] = [
  { id: "theme-ocean", name: "Ocean Theme", price: 800, type: "theme", value: "ocean", icon: Palette, preview: "🌊" },
  { id: "theme-sunset", name: "Sunset Theme", price: 800, type: "theme", value: "sunset", icon: Palette, preview: "🌅" },
  { id: "theme-forest", name: "Forest Theme", price: 800, type: "theme", value: "forest", icon: Palette, preview: "🌲" },
  { id: "theme-candy", name: "Candy Theme", price: 1000, type: "theme", value: "candy", icon: Palette, preview: "🍬" },
  { id: "font-comic", name: "Comic Font", price: 500, type: "font", value: "comic", icon: Type, preview: "Aa" },
  { id: "font-pixel", name: "Pixel Font", price: 500, type: "font", value: "pixel", icon: Type, preview: "Aa" },
  { id: "cosmetic-crown", name: "Golden Crown", price: 1500, type: "cosmetic", value: "crown", icon: Sparkles, preview: "👑" },
  { id: "cosmetic-glasses", name: "Cool Glasses", price: 1000, type: "cosmetic", value: "glasses", icon: Sparkles, preview: "🕶️" },
  { id: "cosmetic-cape", name: "Hero Cape", price: 1200, type: "cosmetic", value: "cape", icon: Sparkles, preview: "🦸" },
  { id: "cosmetic-sparkle", name: "Sparkle Trail", price: 2000, type: "cosmetic", value: "sparkle", icon: Sparkles, preview: "✨" },
];

export default function Shop() {
  const { state, purchaseItem, isItemPurchased, equipItem } = useGame();

  const isEquipped = (item: ShopItem) => {
    if (item.type === "theme") return state.activeTheme === item.value;
    if (item.type === "font") return state.activeFont === item.value;
    return false;
  };

  const handleClick = (item: ShopItem) => {
    const owned = isItemPurchased(item.id);
    if (owned) {
      if (item.type === "cosmetic") {
        toast.info("Cosmetic equipped!");
        return;
      }
      if (isEquipped(item)) {
        toast.info("Already equipped!");
        return;
      }
      equipItem(item);
      toast.success(`Equipped ${item.name}! ✨`);
      return;
    }
    if (state.xp < item.price) {
      toast.error(`Not enough XP! You need ${item.price - state.xp} more XP.`);
      return;
    }
    const success = purchaseItem(item);
    if (success) {
      toast.success(`Purchased ${item.name}! 🎉`);
    }
  };

  const grouped = {
    theme: shopItems.filter((i) => i.type === "theme"),
    font: shopItems.filter((i) => i.type === "font"),
    cosmetic: shopItems.filter((i) => i.type === "cosmetic"),
  };

  return (
    <div className="container py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-2 text-center">Shop</h1>
      <div className="flex items-center justify-center gap-2 mb-8">
        <Star className="text-xp fill-xp" size={20} />
        <span className="text-xl font-extrabold">{state.xp.toLocaleString()} XP available</span>
      </div>

      {[
        { key: "theme" as const, title: "🎨 Color Themes", items: grouped.theme },
        { key: "font" as const, title: "✏️ Font Styles", items: grouped.font },
        { key: "cosmetic" as const, title: "✨ Character Cosmetics", items: grouped.cosmetic },
      ].map(({ key, title, items }) => (
        <section key={key} className="mb-8">
          <h2 className="text-xl font-extrabold mb-4">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item, i) => {
              const owned = isItemPurchased(item.id);
              const equipped = isEquipped(item);
              const canAfford = state.xp >= item.price;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                  onClick={() => handleClick(item)}
                  className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                    equipped
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                      : owned
                      ? "border-success bg-success/5 hover:border-primary hover:bg-primary/5"
                      : canAfford
                      ? "border-border bg-card hover:border-primary hover:shadow-md"
                      : "border-border bg-muted/50 opacity-60"
                  }`}
                >
                  {equipped && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      <Zap size={10} />
                      <span className="text-[10px] font-bold">Active</span>
                    </div>
                  )}
                  {owned && !equipped && (
                    <div className="absolute top-2 right-2">
                      <Check size={16} className="text-success" />
                    </div>
                  )}
                  <div className="text-3xl mb-2">{item.preview}</div>
                  <p className="font-extrabold text-sm">{item.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {owned ? (
                      <span className="text-xs font-bold text-success">
                        {equipped ? "Equipped" : "Tap to equip"}
                      </span>
                    ) : (
                      <>
                        <Star size={12} className="text-xp fill-xp" />
                        <span className="text-xs font-bold">{item.price.toLocaleString()} XP</span>
                      </>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
