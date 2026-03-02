"use client";

import { useState } from "react";
import Link from "next/link";
import TarotReader from "@/components/TarotReader";

type CareerCategory = "current" | "move" | "achieve";

const CAREER_CATEGORIES = [
  {
    id: "current" as CareerCategory,
    label: "현재 직장 흐름",
    emoji: "🏢",
    description: "지금 직장에서의 에너지",
    subtitle: "Current Work Flow",
    theme: "career_current",
  },
  {
    id: "move" as CareerCategory,
    label: "이직 · 이동운",
    emoji: "🚀",
    description: "새로운 환경으로의 변화",
    subtitle: "Career Move",
    theme: "career_move",
  },
  {
    id: "achieve" as CareerCategory,
    label: "성과 · 승진 · 금전",
    emoji: "💰",
    description: "성과와 보상의 흐름",
    subtitle: "Achievement & Promotion",
    theme: "career_achieve",
  },
];

const CAREER_QUESTIONS: Record<CareerCategory, string[]> = {
  current: [
    "지금 회사에서 제 위치는 어떤가요?",
    "상사(또는 동료)가 저를 어떻게 보고 있나요?",
    "지금 이 직장을 계속 다니는 게 좋을까요?",
    "최근 일이 잘 안 풀리는 이유는 무엇인가요?",
  ],
  move: [
    "이직을 준비하면 좋은 결과가 있을까요?",
    "지금 이직 타이밍이 맞을까요?",
    "옮기게 된다면 더 좋은 환경인가요?",
    "새로운 제안이 들어올 가능성이 있나요?",
  ],
  achieve: [
    "승진 가능성이 있을까요?",
    "이번 프로젝트 결과는 어떨까요?",
    "연봉 인상 운이 있나요?",
    "직장에서 저를 시기하는 사람이 있나요?",
    "노력한 만큼 인정받을 수 있을까요?",
  ],
};

export default function CareerTarotPage() {
  const [category, setCategory] = useState<CareerCategory>("current");

  const selectedCat = CAREER_CATEGORIES.find((c) => c.id === category)!;

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 처음으로
          </Link>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">✦ Career Tarot</p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">직장운 타로</h1>
          <p className="text-[#8888AA] text-sm">취업·이직·승진까지, 직장의 흐름을 카드에게 물어보세요</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {CAREER_CATEGORIES.map((cat) => (
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
            questions={CAREER_QUESTIONS[category]}
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
