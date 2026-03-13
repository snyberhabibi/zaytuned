"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Card {
  id: number;
  type: "city" | "symbol";
  value: string;
  label: { ar: string; en: string };
  isFlipped: boolean;
  isMatched: boolean;
}

const gameData: { value: string; label: { ar: string; en: string } }[] = [
  { value: "🕌", label: { ar: "المسجد الأقصى", en: "Al-Aqsa" } },
  { value: "🍊", label: { ar: "برتقال يافا", en: "Jaffa Orange" } },
  { value: "🧵", label: { ar: "تطريز", en: "Tatreez" } },
  { value: "🫒", label: { ar: "زيتون", en: "Olive" } },
  { value: "🥙", label: { ar: "فلافل", en: "Falafel" } },
  { value: "☕", label: { ar: "قهوة عربية", en: "Arabic Coffee" } },
  { value: "🏺", label: { ar: "جرة", en: "Jarra (Jar)" } },
  { value: "🗝️", label: { ar: "مفتاح العودة", en: "Key of Return" } },
];

interface MemoryMatchProps {
  onComplete?: (score: number) => void;
  difficulty?: "easy" | "medium" | "hard";
}

export function MemoryMatch({ onComplete, difficulty = "easy" }: MemoryMatchProps) {
  const { language } = useLanguage();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const pairsCount = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
  const totalPairs = pairsCount;

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const selectedItems = gameData.slice(0, pairsCount);
    const cardPairs: Card[] = [];

    selectedItems.forEach((item, index) => {
      // Create pair
      cardPairs.push({
        id: index * 2,
        type: "symbol",
        value: item.value,
        label: item.label,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: index * 2 + 1,
        type: "symbol",
        value: item.value,
        label: item.label,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    if (flippedCards.length >= 2) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves((m) => m + 1);

      const [first, second] = newFlipped;
      const card1 = cards.find((c) => c.id === first);
      const card2 = cards.find((c) => c.id === second);

      if (card1 && card2 && card1.value === card2.value) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatches((m) => {
            const newMatches = m + 1;
            if (newMatches === totalPairs) {
              setGameComplete(true);
              onComplete?.(calculateScore());
            }
            return newMatches;
          });
          setFlippedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const calculateScore = () => {
    const baseScore = totalPairs * 100;
    const movesPenalty = Math.max(0, (moves - totalPairs) * 5);
    return Math.max(0, baseScore - movesPenalty);
  };

  const gridCols =
    pairsCount <= 4
      ? "grid-cols-4"
      : pairsCount <= 6
      ? "grid-cols-4"
      : "grid-cols-4";

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg">
            {language === "ar" ? "لعبة الذاكرة" : "Memory Match"}
          </h3>
          <p className="text-sm text-[var(--foreground-muted)]">
            {language === "ar" ? "جد الأزواج المتطابقة" : "Find matching pairs"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[var(--foreground-muted)]">
            {language === "ar" ? "المحاولات" : "Moves"}: {moves}
          </p>
          <p className="text-sm font-bold text-[var(--tatreez-green)]">
            {matches}/{totalPairs}
          </p>
        </div>
      </div>

      {/* Game Grid */}
      {!gameComplete ? (
        <div className={`grid ${gridCols} gap-2`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched}
              className={`aspect-square rounded-lg text-3xl flex items-center justify-center transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? "bg-[var(--cream)] rotate-0"
                  : "bg-[var(--tatreez-red)] text-white hover:scale-105"
              } ${card.isMatched ? "opacity-50" : ""}`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {card.isFlipped || card.isMatched ? card.value : "?"}
            </button>
          ))}
        </div>
      ) : (
        /* Completion Screen */
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">
            {language === "ar" ? "أحسنت!" : "Great Job!"}
          </h3>
          <p className="text-[var(--foreground-muted)] mb-4">
            {language === "ar"
              ? `أكملت اللعبة في ${moves} محاولة`
              : `You completed the game in ${moves} moves`}
          </p>
          <p className="text-2xl font-bold text-[var(--tatreez-green)] mb-6">
            +{calculateScore()} {language === "ar" ? "نقطة" : "points"}
          </p>
          <button onClick={initializeGame} className="btn-primary">
            {language === "ar" ? "العب مرة أخرى" : "Play Again"}
          </button>
        </div>
      )}

      {/* Restart Button */}
      {!gameComplete && (
        <button
          onClick={initializeGame}
          className="w-full mt-4 btn-secondary text-sm"
        >
          {language === "ar" ? "إعادة اللعبة" : "Restart Game"}
        </button>
      )}
    </div>
  );
}
