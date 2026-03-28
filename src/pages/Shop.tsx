import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Star, Palette, Type, Zap, Check, TrendingUp, Eye, Tag } from "lucide-react";
import { toast } from "sonner";

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: "theme" | "font" | "powerup";
  value: string;
  icon: typeof Palette;
  preview?: string;
  description?: string;
}

const shopItems: ShopItem[] = [
  { id: "theme-ocean", name: "Ocean Theme", price: 800, type: "theme", value: "ocean", icon: Palette, preview: "🌊" },
  { id: "theme-sunset", name: "Sunset Theme", price: 800, type: "theme", value: "sunset", icon: Palette, preview: "🌅" },
  { id: "theme-forest", name: "Forest Theme", price: 800, type: "theme", value: "forest", icon: Palette, preview: "🌲" },
  { id: "theme-candy", name: "Candy Theme", price: 1000, type: "theme", value: "candy", icon: Palette, preview: "🍬" },
  { id: "theme-galaxy", name: "Galaxy Theme", price: 1200, type: "theme", value: "galaxy", icon: Palette, preview: "🌌" },
  { id: "theme-arctic", name: "Arctic Theme", price: 900, type: "theme", value: "arctic", icon: Palette, preview: "❄️" },
  { id: "theme-lavender", name: "Lavender Theme", price: 900, type: "theme", value: "lavender", icon: Palette, preview: "💜" },
  { id: "font-comic", name: "Comic Font", price: 500, type: "font", value: "comic", icon: Type, preview: "Aa" },
  { id: "font-pixel", name: "Pixel Font", price: 500, type: "font", value: "pixel", icon: Type, preview: "Aa" },
  { id: "font-cursive", name: "Cursive Font", price: 600, type: "font", value: "cursive", icon: Type, preview: "𝒜𝒶" },
  { id: "font-rounded", name: "Rounded Font", price: 600, type: "font", value: "rounded", icon: Type, preview: "Aa" },
  { id: "font-mono", name: "Mono Font", price: 500, type: "font", value: "mono", icon: Type, preview: "Aa" },
  { id: "powerup-xp-booster", name: "XP Booster", price: 3000, type: "powerup", value: "xp-booster", icon: TrendingUp, preview: "⚡", description: "Earn 1.5× XP on all scenarios" },
  { id: "powerup-hint", name: "Hint Revealer", price: 2500, type: "powerup", value: "hint", icon: Eye, preview: "🔍", description: "See a hint before answering" },
  
  { id: "powerup-shop-discount", name: "Shop Discount", price: 4000, type: "powerup", value: "shop-discount", icon: Tag, preview: "🏷️", description: "25% off all future purchases" },
];

export default function Shop() {
  const { state, purchaseItem, isItemPurchased, equipItem, togglePowerUp, hasPowerUp } = useGame();

  const isEquipped = (item: ShopItem) => {
    if (item.type === "theme") return state.activeTheme === item.value;
    if (item.type === "font") return state.activeFont === item.value;
    if (item.type === "powerup") return state.activePowerUps.includes(item.value);
    return false;
  };

  const hasDiscount = hasPowerUp("shop-discount");

  const handleClick = (item: ShopItem) => {
    const owned = isItemPurchased(item.id);
    if (owned) {
      if (item.type === "powerup") {
        togglePowerUp(item.value);
        const equipped = state.activePowerUps.includes(item.value);
        toast.success(equipped ? `Deactivated ${item.name}` : `Activated ${item.name}! ⚡`);
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
    // Check if trying to buy a power-up when one is already owned
    if (item.type === "powerup") {
      const ownedPowerUp = shopItems.find((si) => si.type === "powerup" && isItemPurchased(si.id));
      if (ownedPowerUp) {
        toast.error(`You already own "${ownedPowerUp.name}". You can only have one power-up!`);
        return;
      }
    }
    const discount = hasDiscount ? 0.75 : 1;
    const finalPrice = Math.round(item.price * discount);
    if (state.xp < finalPrice) {
      toast.error(`Not enough XP! You need ${finalPrice - state.xp} more XP.`);
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
    powerup: shopItems.filter((i) => i.type === "powerup"),
  };

  return (
    <div className="container py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-2 text-center">Shop</h1>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star className="text-xp fill-xp" size={20} />
        <span className="text-xl font-extrabold">{state.xp.toLocaleString()} XP available</span>
      </div>
      {state.bestStreak > 0 && (
        <p className="text-center text-sm font-bold text-muted-foreground mb-2">
          🔥 Best streak: {state.bestStreak} | Current: {state.streak}
        </p>
      )}
      {hasDiscount && (
        <p className="text-center text-xs font-bold text-success mb-4">🏷️ 25% discount active on all purchases!</p>
      )}

      {[
        { key: "powerup" as const, title: "⚡ Power-Ups", items: grouped.powerup },
        { key: "theme" as const, title: "🎨 Color Themes", items: grouped.theme },
        { key: "font" as const, title: "✏️ Font Styles", items: grouped.font },
      ].map(({ key, title, items }) => (
        <section key={key} className="mb-8">
          <h2 className="text-xl font-extrabold mb-1">{title}</h2>
          {key === "powerup" && (
            <p className="text-xs text-muted-foreground mb-3">You can only own one power-up. Choose wisely!</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item, i) => {
              const owned = isItemPurchased(item.id);
              const equipped = isEquipped(item);
              const discount = hasDiscount ? 0.75 : 1;
              const finalPrice = Math.round(item.price * discount);
              const hasOtherPowerUp = item.type === "powerup" && !owned && shopItems.some((si) => si.type === "powerup" && si.id !== item.id && isItemPurchased(si.id));
              const canAfford = state.xp >= finalPrice && !hasOtherPowerUp;

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
                  <div className={`text-3xl mb-2 ${item.type === "font" ? `font-${item.value}` : ""}`}>{item.preview}</div>
                  <p className="font-extrabold text-sm">{item.name}</p>
                  {item.description && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{item.description}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    {owned ? (
                      <span className="text-xs font-bold text-success">
                        {equipped ? (item.type === "powerup" ? "Tap to deactivate" : "Equipped") : item.type === "powerup" ? "Tap to activate" : "Tap to equip"}
                      </span>
                    ) : (
                      <>
                        <Star size={12} className="text-xp fill-xp" />
                        {hasDiscount && !owned ? (
                          <span className="text-xs font-bold">
                            <span className="line-through text-muted-foreground mr-1">{item.price.toLocaleString()}</span>
                            {finalPrice.toLocaleString()} XP
                          </span>
                        ) : (
                          <span className="text-xs font-bold">{item.price.toLocaleString()} XP</span>
                        )}
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
