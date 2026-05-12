import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

type StoreCtx = {
  favorites: string[];
  cart: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

function useLocal(key: string) {
  const [value, setValue] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, [key]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, hydrated]);
  return [value, setValue] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocal("tamghart_favorites");
  const [cart, setCart] = useLocal("tamghart_cart");

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, [setFavorites]);
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const addToCart = useCallback((id: string) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [setCart]);
  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((x) => x !== id));
  }, [setCart]);

  return (
    <Ctx.Provider value={{ favorites, cart, toggleFavorite, isFavorite, addToCart, removeFromCart }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("StoreProvider missing");
  return v;
}
