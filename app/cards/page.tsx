import Link from "next/link";
import type { Metadata } from "next";
import { MAJOR_ARCANA } from "@/constants/tarot";

export const metadata: Metadata = {
  title: "타로 카드 78장 해석 — 투데이타로",
  description: "메이저 아르카나 22장의 타로 카드 의미와 연애운, 직장운, 속마음, 재회 해석을 확인해보세요.",
  keywords: ["타로카드 의미", "타로카드 해석", "메이저 아르카나", "타로카드 종류", "타로카드 설명"],
};

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 홈으로
          </Link>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">타로 카드 해석</h1>
          <p className="text-[#8888AA] text-sm">메이저 아르카나 22장의 의미를 알아보세요</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
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
