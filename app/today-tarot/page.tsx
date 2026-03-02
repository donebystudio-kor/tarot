"use client";

import { useState } from "react";
import Link from "next/link";
import TarotReader from "@/components/TarotReader";

type GeneralCategory = "flow" | "luck" | "relation";

const GENERAL_CATEGORIES = [
  {
    id: "flow" as GeneralCategory,
    label: "오늘의 전체 흐름",
    emoji: "🌊",
    description: "오늘 하루 전반의 기운",
    theme: "general_flow",
  },
  {
    id: "luck" as GeneralCategory,
    label: "오늘의 행운 포인트",
    emoji: "🍀",
    description: "행운과 주의할 것",
    theme: "general_luck",
  },
  {
    id: "relation" as GeneralCategory,
    label: "인간관계 운",
    emoji: "👥",
    description: "오늘 만남과 관계",
    theme: "general_relation",
  },
];

const GENERAL_QUESTIONS: Record<GeneralCategory, string[]> = {
  flow: [
    "오늘 하루의 전반적인 기운은 어떤가요?",
    "오늘 조심해야 할 일이 있을까요?",
    "오늘 저에게 들어오는 기회는 무엇인가요?",
    "오늘 운이 좋은 시간대가 있을까요?",
    "오늘 제 감정 상태는 어떨까요?",
  ],
  luck: [
    "오늘 행운을 부르는 행동은 무엇인가요?",
    "오늘 피해야 할 선택은 무엇인가요?",
    "오늘 저에게 좋은 색깔 / 숫자는?",
    "오늘 연락이 오거나 만날 사람이 있을까요?",
    "오늘 예상치 못한 일이 생길까요?",
  ],
  relation: [
    "오늘 누군가와 갈등이 생길까요?",
    "오늘 저를 도와줄 사람이 있나요?",
    "오늘 새로운 인연을 만날 가능성이 있나요?",
    "오늘 먼저 연락하는 게 좋을까요?",
  ],
};

export default function TodayTarotPage() {
  const [category, setCategory] = useState<GeneralCategory>("flow");

  const selectedCat = GENERAL_CATEGORIES.find((c) => c.id === category)!;

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 처음으로
          </Link>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">✦ Daily Tarot</p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">오늘의 운세</h1>
          <p className="text-[#8888AA] text-sm">오늘 하루 전반적인 흐름을 카드에게 물어보세요</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {GENERAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`rounded-xl p-4 text-center transition-all duration-200 border ${
                category === cat.id
                  ? "border-[#C9A96E] bg-[#C9A96E]/15"
                  : "border-[#2D2D5E] bg-[#1A1A35] hover:border-[#C9A96E]/50"
              }`}
            >
              <div className="text-2xl mb-2">{cat.emoji}</div>
              <div className={`font-medium text-xs leading-tight ${category === cat.id ? "text-[#C9A96E]" : "text-[#E8E8FF]"}`}>
                {cat.label}
              </div>
              <div className="text-[#8888AA] text-xs mt-1 leading-tight">{cat.description}</div>
            </button>
          ))}
        </div>

        {/* 타로 리더 */}
        <div key={category} className="fade-in-up">
          <TarotReader
            theme={selectedCat.theme}
            questions={GENERAL_QUESTIONS[category]}
            themeLabel={selectedCat.label}
            themeEmoji={selectedCat.emoji}
          />
        </div>

        <div className="text-center mt-12 mb-4">
          <Link href="/cards" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors">
            타로 카드 의미 보기 →
          </Link>
        </div>

      </div>
    </main>
  );
}
