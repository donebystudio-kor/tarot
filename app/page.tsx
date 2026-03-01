"use client";

import { useState, useCallback } from "react";
import { MAJOR_ARCANA, THEMES, POSITIONS, TarotCard as TarotCardType, ThemeId } from "@/constants/tarot";
import TarotCard from "@/components/TarotCard";
import TypewriterText from "@/components/TypewriterText";
import StarBackground from "@/components/StarBackground";

type Step = "theme" | "pick" | "result";

interface SelectedCard {
  card: TarotCardType;
  isReversed: boolean;
}

function shuffleAndPick(count: number): { card: TarotCardType; isReversed: boolean }[] {
  const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    card,
    isReversed: Math.random() > 0.7,
  }));
}

export default function Home() {
  const [step, setStep] = useState<Step>("theme");
  const [theme, setTheme] = useState<ThemeId>("general");
  const [deck, setDeck] = useState<{ card: TarotCardType; isReversed: boolean }[]>([]);
  const [selected, setSelected] = useState<SelectedCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const [reading, setReading] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeSelect = (t: ThemeId) => {
    setTheme(t);
    setDeck(shuffleAndPick(10));
    setSelected([]);
    setStep("pick");
  };

  const handleCardPick = (idx: number) => {
    if (selected.length >= 3) return;
    if (selected.some((s) => s.card.id === deck[idx].card.id)) return;
    const newSelected = [...selected, deck[idx]];
    setSelected(newSelected);
    if (newSelected.length === 3) {
      setTimeout(() => startReading(newSelected), 300);
    }
  };

  const startReading = async (cards: SelectedCard[]) => {
    setStep("result");
    setFlipped([false, false, false]);
    setReading("");
    setIsLoading(true);

    for (let i = 0; i < 3; i++) {
      await new Promise((r) => setTimeout(r, i * 700 + 400));
      setFlipped((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
    }

    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards: cards.map((c) => ({
            name: c.card.name,
            nameKo: c.card.nameKo,
            isReversed: c.isReversed,
          })),
          theme,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setReading(`❌ ${errText}`);
        return;
      }
      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setReading(full);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setStep("theme");
    setSelected([]);
    setDeck([]);
    setFlipped([false, false, false]);
    setReading("");
  }, []);

  const selectedTheme = THEMES.find((t) => t.id === theme);

  return (
    <main className="relative min-h-screen flex flex-col items-center px-4 py-12 z-10">
      <StarBackground />

      {/* 헤더 */}
      <div className="relative z-10 text-center mb-12">
        <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-2">✦ Tarot Reading ✦</p>
        <h1 className="text-4xl font-bold text-[#E8E8FF] mb-2">투데이타로</h1>
        <p className="text-[#8888AA] text-sm">카드가 전하는 메시지에 귀를 기울여보세요</p>
      </div>

      {/* Step 1: 주제 선택 */}
      {step === "theme" && (
        <div className="relative z-10 w-full max-w-md fade-in-up">
          <p className="text-center text-[#E8E8FF] mb-6 text-lg">무엇을 알고 싶으신가요?</p>
          <div className="grid grid-cols-2 gap-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeSelect(t.id)}
                className="bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] hover:bg-[#252545]
                  rounded-xl p-5 text-left transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="text-[#E8E8FF] font-medium text-sm group-hover:text-[#C9A96E] transition-colors">
                  {t.label}
                </div>
                <div className="text-[#8888AA] text-xs mt-1">{t.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: 카드 선택 */}
      {step === "pick" && (
        <div className="relative z-10 w-full max-w-2xl fade-in-up">
          <div className="text-center mb-8">
            <p className="text-[#C9A96E] text-sm mb-1">{selectedTheme?.emoji} {selectedTheme?.label}</p>
            <p className="text-[#E8E8FF] text-lg">마음을 가라앉히고 카드를 3장 선택하세요</p>
            <p className="text-[#8888AA] text-sm mt-1">
              {selected.length === 0 && "첫 번째 카드 — 과거"}
              {selected.length === 1 && "두 번째 카드 — 현재"}
              {selected.length === 2 && "세 번째 카드 — 미래"}
              {selected.length === 3 && "✦ 카드를 해석하는 중..."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {deck.map((item, idx) => {
              const isChosen = selected.some((s) => s.card.id === item.card.id);
              return (
                <TarotCard
                  key={item.card.id}
                  isSelected={isChosen}
                  isDisabled={isChosen || selected.length >= 3}
                  onClick={() => handleCardPick(idx)}
                />
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < selected.length ? "bg-[#C9A96E]" : "bg-[#2D2D5E]"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 3: 결과 */}
      {step === "result" && (
        <div className="relative z-10 w-full max-w-2xl fade-in-up">
          <div className="text-center mb-8">
            <p className="text-[#C9A96E] text-sm mb-1">{selectedTheme?.emoji} {selectedTheme?.label}</p>
            <p className="text-[#E8E8FF] text-lg">카드가 전하는 메시지</p>
          </div>

          {/* 뽑힌 카드 3장 */}
          <div className="flex justify-center gap-6 mb-10">
            {selected.map((item, i) => (
              <TarotCard
                key={item.card.id}
                card={item.card}
                isReversed={item.isReversed}
                isFlipped={flipped[i]}
                position={POSITIONS[i]}
              />
            ))}
          </div>

          {/* AI 해석 */}
          <div className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 min-h-[120px]">
            <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-4">✦ 카드의 메시지</p>
            {isLoading && reading === "" ? (
              <div className="flex items-center gap-2 text-[#8888AA] text-sm">
                <span className="animate-pulse">✦</span>
                <span>카드를 해석하는 중...</span>
              </div>
            ) : (
              <TypewriterText
                text={reading}
                speed={15}
                className="text-[#E8E8FF] text-sm leading-7 whitespace-pre-wrap"
              />
            )}
          </div>

          {/* 다시 뽑기 */}
          {!isLoading && reading && (
            <div className="text-center mt-8 fade-in-up">
              <button
                onClick={handleReset}
                className="px-8 py-3 border border-[#C9A96E] text-[#C9A96E] rounded-full
                  hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all duration-200 text-sm tracking-wider"
              >
                ✦ 다시 뽑기
              </button>
            </div>
          )}
        </div>
      )}

      <footer className="relative z-10 mt-16 text-center text-[#2D2D5E] text-xs">
        <p>타로는 재미와 영감을 위한 것입니다 · © 2026 투데이타로</p>
      </footer>
    </main>
  );
}
