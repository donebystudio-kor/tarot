import Link from "next/link";
import type { Metadata } from "next";
import { MAJOR_ARCANA, MINOR_ARCANA } from "@/constants/tarot";

export const metadata: Metadata = {
  title: "타로 카드 78장 해석 — 타로던",
  description: "메이저 아르카나 22장과 마이너 아르카나 56장의 타로 카드 의미와 연애운, 직장운, 속마음, 재회 해석을 확인해보세요.",
  keywords: ["타로카드 의미", "타로카드 해석", "메이저 아르카나", "마이너 아르카나", "타로카드 종류", "타로카드 설명"],
};

const SUITS = [
  { name: "완드 (Wands)", emoji: "🔥", cards: MINOR_ARCANA.filter((c) => c.id >= 22 && c.id <= 35) },
  { name: "컵 (Cups)", emoji: "💧", cards: MINOR_ARCANA.filter((c) => c.id >= 36 && c.id <= 49) },
  { name: "소드 (Swords)", emoji: "⚔️", cards: MINOR_ARCANA.filter((c) => c.id >= 50 && c.id <= 63) },
  { name: "펜타클 (Pentacles)", emoji: "🪙", cards: MINOR_ARCANA.filter((c) => c.id >= 64 && c.id <= 77) },
];

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 홈으로
          </Link>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">타로 카드 해석</h1>
          <p className="text-[#8888AA] text-sm">78장의 타로 카드 의미를 알아보세요</p>
        </div>

        <h2 className="text-[#C9A96E] text-sm tracking-widest uppercase mb-4">✦ 메이저 아르카나 (22장)</h2>
        <div className="grid grid-cols-2 gap-3 mb-10">
          {MAJOR_ARCANA.map((card) => (
            <Link
              key={card.slug}
              href={`/cards/${card.slug}`}
              className="bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] hover:bg-[#252545] rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{card.symbol}</span>
                <div>
                  <div className="text-[#E8E8FF] text-sm font-medium group-hover:text-[#C9A96E] transition-colors">
                    {card.nameKo}
                  </div>
                  <div className="text-[#8888AA] text-xs">{card.keywords[0]}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-[#C9A96E] text-sm tracking-widest uppercase mb-4">✦ 마이너 아르카나 (56장)</h2>
        {SUITS.map((suit) => (
          <div key={suit.name} className="mb-8">
            <h3 className="text-[#E8E8FF] text-sm font-medium mb-3">{suit.emoji} {suit.name}</h3>
            <div className="grid grid-cols-2 gap-3">
              {suit.cards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/cards/${card.slug}`}
                  className="bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] hover:bg-[#252545] rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{card.symbol}</span>
                    <div>
                      <div className="text-[#E8E8FF] text-sm font-medium group-hover:text-[#C9A96E] transition-colors">
                        {card.nameKo}
                      </div>
                      <div className="text-[#8888AA] text-xs">{card.keywords[0]}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-[#C9A96E] text-[#C9A96E] rounded-full hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all text-sm"
          >
            ✦ 지금 타로 뽑기
          </Link>
        </div>

      </div>
    </main>
  );
}
