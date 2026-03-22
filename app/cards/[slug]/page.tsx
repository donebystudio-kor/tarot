import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ALL_CARDS } from "@/constants/tarot";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const card = ALL_CARDS.find((c) => c.slug === slug);
  if (!card) return {};
  return {
    title: `${card.nameKo} 타로 카드 해석 — 투데이타로`,
    description: `타로 ${card.nameKo} 카드의 정방향·역방향 의미와 연애운, 직장운, 속마음 해석을 알아보세요. ${card.keywords.join(", ")}`,
    keywords: [card.nameKo, card.name, "타로카드", "타로해석", "연애타로", `${card.nameKo} 타로`],
    openGraph: {
      title: `${card.nameKo} 타로 카드 — ${card.keywords.join(" · ")}`,
      description: card.description,
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  const card = ALL_CARDS.find((c) => c.slug === slug);
  if (!card) notFound();

  const idx = ALL_CARDS.findIndex((c) => c.slug === slug);
  const related = [
    ALL_CARDS[(idx - 1 + ALL_CARDS.length) % ALL_CARDS.length],
    ALL_CARDS[(idx + 1) % ALL_CARDS.length],
    ALL_CARDS[(idx + 3) % ALL_CARDS.length],
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${card.nameKo} 타로 카드 해석`,
    "description": card.description,
    "author": { "@type": "Organization", "name": "타로던" },
  };

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-2xl mx-auto">

        {/* 뒤로가기 */}
        <Link href="/cards" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-8 inline-block">
          ← 전체 카드 목록
        </Link>

        {/* 카드 헤더 */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">{card.symbol}</div>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-1">
            {card.id <= 21 ? `Major Arcana · ${card.id}번` : "Minor Arcana"}
          </p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-1">{card.nameKo}</h1>
          <p className="text-[#8888AA] text-sm">{card.name}</p>
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {card.keywords.map((kw) => (
              <span key={kw} className="text-xs px-3 py-1 rounded-full border border-[#2D2D5E] text-[#8888AA]">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* 카드 소개 */}
        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-4">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">✦ 카드 소개</p>
          <p className="text-[#E8E8FF] text-sm leading-7">{card.description}</p>
        </section>

        {/* 정방향 / 역방향 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-5">
            <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">↑ 정방향</p>
            <p className="text-[#E8E8FF] text-sm leading-6">{card.uprightMeaning}</p>
          </section>
          <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-5">
            <p className="text-[#8888AA] text-xs tracking-widest uppercase mb-2">↓ 역방향</p>
            <p className="text-[#E8E8FF] text-sm leading-6">{card.reversedMeaning}</p>
          </section>
        </div>

        {/* 연애 해석 */}
        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-4">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">💕 연애운 해석</p>
          <p className="text-[#E8E8FF] text-sm leading-7">{card.loveReading}</p>
        </section>

        {/* 재회 해석 */}
        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-4">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">🔄 재회 해석</p>
          <p className="text-[#E8E8FF] text-sm leading-7">{card.reunionReading}</p>
        </section>

        {/* 속마음 해석 */}
        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-4">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">💭 속마음 해석</p>
          <p className="text-[#E8E8FF] text-sm leading-7">{card.innerMindReading}</p>
        </section>

        {/* 직장 해석 */}
        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-6">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">💼 직장운 해석</p>
          <p className="text-[#E8E8FF] text-sm leading-7">{card.careerReading}</p>
        </section>

        {/* 타로 뽑기 CTA */}
        <div className="text-center bg-[#1A1A35] border border-[#C9A96E] rounded-2xl p-8 mb-8">
          <p className="text-[#E8E8FF] text-lg font-medium mb-2">오늘의 타로 리딩 받기</p>
          <p className="text-[#8888AA] text-sm mb-5">AI가 해석하는 무료 타로 리딩으로 오늘의 흐름을 확인해보세요</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#C9A96E] text-[#0D0D1E] rounded-full font-medium hover:bg-[#a8864e] transition-colors text-sm"
          >
            ✦ 지금 무료로 뽑기
          </Link>
        </div>

        {/* 관련 카드 */}
        <section>
          <p className="text-[#8888AA] text-xs tracking-widest uppercase mb-4">다른 카드 보기</p>
          <div className="grid grid-cols-3 gap-3">
            {related.map((rc) => (
              <Link
                key={rc.slug}
                href={`/cards/${rc.slug}`}
                className="bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] rounded-xl p-4 text-center transition-all"
              >
                <div className="text-2xl mb-1">{rc.symbol}</div>
                <div className="text-[#E8E8FF] text-xs font-medium">{rc.nameKo}</div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
