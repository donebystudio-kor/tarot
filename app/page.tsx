import Link from "next/link";
import StarBackground from "@/components/StarBackground";
import { THEMES } from "@/constants/tarot";

const THEME_URLS: Record<string, string> = {
  general: "/today-tarot",
  yesno: "/yes-no-tarot",
  love: "/love-tarot",
  career: "/career-tarot",
  study: "/study-tarot",
};

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "타로던",
    "url": "https://tarot-sigma-wheat.vercel.app",
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center px-4 py-12 z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <StarBackground />

      <div className="relative z-10 text-center mb-12">
        <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-2">✦ Tarot Reading ✦</p>
        <h1 className="text-4xl font-bold text-[#E8E8FF] mb-1">Tarot Done</h1>
        <p className="text-[#8888AA] text-xs mb-3">타로던</p>
        <p className="text-[#8888AA] text-sm">카드가 전하는 메시지에 귀를 기울여보세요</p>
        <p className="text-[#C9A96E]/60 text-xs mt-1 tracking-wide italic">Your reading is done.</p>
      </div>

      <div className="relative z-10 w-full max-w-md fade-in-up">
        <p className="text-center text-[#E8E8FF] mb-6 text-lg">무엇을 알고 싶으신가요?</p>
        <div className="grid grid-cols-2 gap-4">
          {THEMES.map((t) => (
            <Link
              key={t.id}
              href={THEME_URLS[t.id]}
              className={`bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] hover:bg-[#252545]
                rounded-xl p-5 text-left transition-all duration-200 group
                ${t.id === "love" ? "col-span-2 flex items-center gap-4" : ""}`}
            >
              <div className={`${t.id === "love" ? "text-4xl" : "text-3xl mb-2"}`}>{t.emoji}</div>
              <div>
                <div className="text-[#E8E8FF] font-medium text-sm group-hover:text-[#C9A96E] transition-colors">
                  {t.label}
                </div>
                <div className="text-[#8888AA] text-xs mt-1">{t.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO 텍스트 */}
      <div className="relative z-10 w-full max-w-md mt-12 text-center">
        <p className="text-[#2D2D5E] text-xs leading-6">
          타로던은 AI가 해석하는 무료 타로카드 사이트입니다. 오늘의 운세, 연애운, 직장운, 학업운을 메이저 아르카나 22장으로 확인해보세요.
          <Link href="/guide" className="text-[#C9A96E]/40 hover:text-[#C9A96E] ml-1 transition-colors">타로카드 가이드 →</Link>
        </p>
      </div>

      <footer className="relative z-10 mt-8 text-center text-xs">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-[#8888AA]">
          <Link href="/cards" className="hover:text-[#C9A96E] transition-colors">타로 카드 해석</Link>
          <Link href="/diary" className="hover:text-[#C9A96E] transition-colors">타로 일기</Link>
          <Link href="/guide" className="hover:text-[#C9A96E] transition-colors">타로 가이드</Link>
          <Link href="/privacy" className="hover:text-[#C9A96E] transition-colors">개인정보처리방침</Link>
        </div>
        <p className="text-[#2D2D5E]">타로는 재미와 영감을 위한 것입니다 · © 2026 Tarot Done</p>
        <p className="mt-1 text-[#2D2D5E]">donebystudio@gmail.com</p>
      </footer>
    </main>
  );
}
