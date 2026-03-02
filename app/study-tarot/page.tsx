"use client";

import { useState } from "react";
import Link from "next/link";
import TarotReader from "@/components/TarotReader";

type StudyCategory = "exam" | "flow" | "path";

const STUDY_CATEGORIES = [
  {
    id: "exam" as StudyCategory,
    label: "시험운",
    emoji: "📝",
    description: "시험 결과와 합격 흐름",
    subtitle: "Exam Fortune",
    theme: "study_exam",
  },
  {
    id: "flow" as StudyCategory,
    label: "공부 흐름",
    emoji: "📖",
    description: "집중력과 학습 에너지",
    subtitle: "Study Flow",
    theme: "study_flow",
  },
  {
    id: "path" as StudyCategory,
    label: "진로 · 선택",
    emoji: "🧭",
    description: "방향과 선택의 흐름",
    subtitle: "Career Path",
    theme: "study_path",
  },
];

const STUDY_QUESTIONS: Record<StudyCategory, string[]> = {
  exam: [
    "이번 시험 결과는 어떨까요?",
    "합격 가능성은 얼마나 되나요?",
    "실수할 가능성이 있나요?",
    "지금 공부 방향이 맞나요?",
  ],
  flow: [
    "요즘 집중력이 떨어진 이유는 무엇인가요?",
    "공부 효율을 높이려면 어떻게 해야 할까요?",
    "지금 쉬어가는 게 좋을까요?",
    "슬럼프가 언제쯤 끝날까요?",
  ],
  path: [
    "지금 선택하려는 전공이 맞나요?",
    "진로 방향을 바꾸는 게 좋을까요?",
    "저에게 맞는 분야는 무엇인가요?",
  ],
};

export default function StudyTarotPage() {
  const [category, setCategory] = useState<StudyCategory>("exam");

  const selectedCat = STUDY_CATEGORIES.find((c) => c.id === category)!;

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 처음으로
          </Link>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">✦ Study Tarot</p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">학업운 타로</h1>
          <p className="text-[#8888AA] text-sm">시험·진로·공부 흐름을 카드에게 물어보세요</p>
        </div>

        {/* 카테고리 탭 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {STUDY_CATEGORIES.map((cat) => (
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

        {/* 타로 리더 */}
        <div key={category} className="fade-in-up">
          <TarotReader
            theme={selectedCat.theme}
            questions={STUDY_QUESTIONS[category]}
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
