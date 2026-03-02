"use client";

import { useState } from "react";
import Link from "next/link";
import TarotReader from "@/components/TarotReader";

type LoveCategory = "solo" | "couple" | "reunion";

const LOVE_CATEGORIES = [
  {
    id: "solo" as LoveCategory,
    label: "솔로운",
    emoji: "💘",
    description: "새로운 인연과 설렘",
    subtitle: "Solo Love Tarot",
    theme: "love_solo",
  },
  {
    id: "couple" as LoveCategory,
    label: "커플운",
    emoji: "💕",
    description: "현재 연인과의 관계",
    subtitle: "Couple Tarot",
    theme: "love_couple",
  },
  {
    id: "reunion" as LoveCategory,
    label: "재회운",
    emoji: "🌙",
    description: "이별 후 재회 가능성",
    subtitle: "Reunion Tarot",
    theme: "love_reunion",
  },
];

const LOVE_QUESTIONS: Record<LoveCategory, string[]> = {
  solo: [
    "새로운 인연이 올까요?",
    "연락이 올까요?",
    "나를 좋아할까요?",
    "고백해도 될까요?",
    "언제 연애할 수 있을까요?",
  ],
  couple: [
    "상대방 속마음이 궁금해요",
    "이 관계가 오래갈까요?",
    "우리 잘 될 수 있을까요?",
    "권태기를 극복할 수 있을까요?",
    "결혼까지 갈 수 있을까요?",
  ],
  reunion: [
    "재회 가능성이 있을까요?",
    "상대방이 먼저 연락할까요?",
    "먼저 연락해도 될까요?",
    "다시 사귈 수 있을까요?",
    "이별 후 어떻게 해야 할까요?",
  ],
};

export default function LoveTarotPage() {
  const [category, setCategory] = useState<LoveCategory>("solo");

  const selectedCat = LOVE_CATEGORIES.find((c) => c.id === category)!;

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 처음으로
          </Link>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">✦ Love Tarot</p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">애정운 타로</h1>
          <p className="text-[#8888AA] text-sm">마음속 사랑의 이야기를 카드에게 물어보세요</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {LOVE_CATEGORIES.map((cat) => (
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
              <div className={`font-medium text-sm ${category === cat.id ? "text-[#C9A96E]" : "text-[#E8E8FF]"}`}>
                {cat.label}
              </div>
              <div className="text-[#8888AA] text-xs mt-1">{cat.description}</div>
            </button>
          ))}
        </div>

        {/* 타로 리더 — 탭 바꿀 때마다 key로 리셋 */}
        <div key={category} className="fade-in-up">
          <TarotReader
            theme={selectedCat.theme}
            questions={LOVE_QUESTIONS[category]}
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
