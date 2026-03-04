import type { Metadata } from "next";
import Link from "next/link";
import { MAJOR_ARCANA } from "@/constants/tarot";

export const metadata: Metadata = {
  title: "타로카드란? 타로 보는 법 완전 가이드 — 타로던",
  description: "타로카드 의미부터 보는 법까지. 메이저 아르카나 22장 설명, 3카드 스프레드 방법, 연애·직장·오늘의 운세 타로 활용법을 알아보세요.",
  keywords: ["타로카드란", "타로카드 보는법", "타로카드 의미", "타로카드 종류", "메이저아르카나", "타로스프레드", "타로배우기", "타로입문"],
  openGraph: {
    title: "타로카드란? 타로 보는 법 완전 가이드",
    description: "타로카드 의미부터 보는 법, 메이저 아르카나 22장까지 한 번에 알아보세요.",
    type: "article",
  },
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 홈으로
          </Link>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">✦ Tarot Guide</p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-3">타로카드 완전 가이드</h1>
          <p className="text-[#8888AA] text-sm">타로카드란 무엇인지, 어떻게 보는지 처음부터 알아보세요</p>
        </div>

        {/* 목차 */}
        <nav className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-5 mb-10">
          <p className="text-[#C9A96E] text-xs tracking-widest mb-3">✦ 목차</p>
          <ol className="space-y-2 text-sm text-[#8888AA]">
            <li><a href="#what-is-tarot" className="hover:text-[#C9A96E] transition-colors">1. 타로카드란 무엇인가요?</a></li>
            <li><a href="#major-arcana" className="hover:text-[#C9A96E] transition-colors">2. 메이저 아르카나 22장</a></li>
            <li><a href="#how-to-read" className="hover:text-[#C9A96E] transition-colors">3. 타로 보는 법 (3카드 스프레드)</a></li>
            <li><a href="#upright-reversed" className="hover:text-[#C9A96E] transition-colors">4. 정방향과 역방향의 의미</a></li>
            <li><a href="#themes" className="hover:text-[#C9A96E] transition-colors">5. 주제별 타로 활용법</a></li>
            <li><a href="#faq" className="hover:text-[#C9A96E] transition-colors">6. 자주 묻는 질문</a></li>
          </ol>
        </nav>

        {/* 섹션 1 */}
        <section id="what-is-tarot" className="mb-12">
          <h2 className="text-xl font-bold text-[#E8E8FF] mb-4 flex items-center gap-2">
            <span className="text-[#C9A96E]">01</span> 타로카드란 무엇인가요?
          </h2>
          <div className="space-y-4 text-[#8888AA] text-sm leading-7">
            <p>
              타로카드는 78장의 카드로 이루어진 점술 도구예요. 14세기 유럽에서 게임용으로 시작되었지만, 18세기부터 점술과 자기 성찰의 도구로 널리 사용되기 시작했어요.
            </p>
            <p>
              타로는 단순히 미래를 예언하는 것이 아니라, <strong className="text-[#E8E8FF]">지금 내 마음과 상황을 다른 시각으로 바라보게 도와주는 도구</strong>예요. 카드가 전하는 메시지를 통해 미처 보지 못했던 감정이나 가능성을 발견할 수 있어요.
            </p>
            <p>
              78장의 카드는 크게 두 그룹으로 나뉘어요. 큰 흐름과 인생의 주요 전환점을 다루는 <strong className="text-[#E8E8FF]">메이저 아르카나 22장</strong>과, 일상적인 사건과 감정을 다루는 <strong className="text-[#E8E8FF]">마이너 아르카나 56장</strong>이에요.
            </p>
          </div>
        </section>

        {/* 섹션 2 */}
        <section id="major-arcana" className="mb-12">
          <h2 className="text-xl font-bold text-[#E8E8FF] mb-4 flex items-center gap-2">
            <span className="text-[#C9A96E]">02</span> 메이저 아르카나 22장
          </h2>
          <p className="text-[#8888AA] text-sm leading-7 mb-6">
            메이저 아르카나는 0번 광대부터 21번 세계까지, 인생의 큰 여정을 상징하는 22장의 카드예요. 각 카드는 강렬한 에너지와 메시지를 담고 있어요.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {MAJOR_ARCANA.map((card) => (
              <Link
                key={card.slug}
                href={`/cards/${card.slug}`}
                className="bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] rounded-xl p-3 transition-all group flex items-center gap-3"
              >
                <span className="text-xl">{card.symbol}</span>
                <div>
                  <div className="text-[#E8E8FF] text-xs font-medium group-hover:text-[#C9A96E] transition-colors">{card.nameKo}</div>
                  <div className="text-[#8888AA] text-xs">{card.keywords.slice(0, 2).join(" · ")}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 섹션 3 */}
        <section id="how-to-read" className="mb-12">
          <h2 className="text-xl font-bold text-[#E8E8FF] mb-4 flex items-center gap-2">
            <span className="text-[#C9A96E]">03</span> 타로 보는 법 — 3카드 스프레드
          </h2>
          <div className="space-y-4 text-[#8888AA] text-sm leading-7">
            <p>
              가장 기본적이고 많이 사용되는 방법은 <strong className="text-[#E8E8FF]">3카드 스프레드</strong>예요. 카드 3장을 뽑아 각각 과거 · 현재 · 미래, 또는 상황 · 행동 · 결과로 해석해요.
            </p>
            <div className="bg-[#1A1A35] border border-[#2D2D5E] rounded-xl p-5">
              <p className="text-[#C9A96E] text-xs mb-4">✦ 3카드 스프레드 방법</p>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-[#C9A96E] font-bold shrink-0">1.</span>
                  <span>마음을 가라앉히고 알고 싶은 질문을 마음속으로 떠올리세요.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C9A96E] font-bold shrink-0">2.</span>
                  <span>카드를 직관적으로 3장 골라요. 손이 가는 카드를 믿으세요.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C9A96E] font-bold shrink-0">3.</span>
                  <span>첫 번째 카드는 과거 또는 현재 상황, 두 번째는 현재 에너지, 세 번째는 미래 방향을 나타내요.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C9A96E] font-bold shrink-0">4.</span>
                  <span>세 카드를 하나의 이야기로 연결해서 해석하면 더 풍부한 메시지를 얻을 수 있어요.</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 섹션 4 */}
        <section id="upright-reversed" className="mb-12">
          <h2 className="text-xl font-bold text-[#E8E8FF] mb-4 flex items-center gap-2">
            <span className="text-[#C9A96E]">04</span> 정방향과 역방향의 의미
          </h2>
          <div className="space-y-4 text-[#8888AA] text-sm leading-7">
            <p>
              카드가 뒤집혀서 나오는 것을 <strong className="text-[#E8E8FF]">역방향</strong>이라고 해요. 역방향 카드는 정방향 의미의 반대이거나, 그 에너지가 막혀있거나 내면에 숨겨진 상태를 나타내요.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A35] border border-[#2D2D5E] rounded-xl p-4">
                <p className="text-[#C9A96E] text-xs mb-2">정방향 ↑</p>
                <p className="text-sm">카드 본래의 에너지가 활성화된 상태. 긍정적이거나 명확한 방향으로 흐르고 있어요.</p>
              </div>
              <div className="bg-[#1A1A35] border border-[#2D2D5E] rounded-xl p-4">
                <p className="text-[#8888AA] text-xs mb-2">역방향 ↓</p>
                <p className="text-sm">에너지가 막히거나 내면의 갈등을 의미해요. 주의가 필요하거나 내면을 돌아볼 때예요.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 5 */}
        <section id="themes" className="mb-12">
          <h2 className="text-xl font-bold text-[#E8E8FF] mb-4 flex items-center gap-2">
            <span className="text-[#C9A96E]">05</span> 주제별 타로 활용법
          </h2>
          <div className="space-y-3">
            {[
              { href: "/today-tarot", emoji: "🌙", label: "오늘의 운세 타로", desc: "하루의 전반적인 흐름과 행운 포인트를 확인할 때 사용해요. 아침에 뽑으면 하루를 준비하는 데 도움이 돼요." },
              { href: "/love-tarot", emoji: "💕", label: "연애 타로", desc: "새로운 인연, 상대방 속마음, 재회 가능성 등 연애에 관한 모든 고민을 카드에게 물어보세요." },
              { href: "/career-tarot", emoji: "💼", label: "직장운 타로", desc: "이직, 승진, 직장 내 인간관계 등 커리어 고민에 활용해요. 지금 직장을 계속 다닐지 고민될 때도 좋아요." },
              { href: "/study-tarot", emoji: "📚", label: "학업운 타로", desc: "시험 결과, 합격 가능성, 진로 선택 등 공부와 관련된 질문을 카드에게 해보세요." },
              { href: "/yes-no-tarot", emoji: "🔮", label: "YES/NO 타로", desc: "결정이 필요할 때 카드 한 장으로 직관적인 답을 얻어보세요." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block bg-[#1A1A35] border border-[#2D2D5E] hover:border-[#C9A96E] rounded-xl p-4 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-[#E8E8FF] text-sm font-medium group-hover:text-[#C9A96E] transition-colors mb-1">{item.label}</p>
                    <p className="text-[#8888AA] text-xs leading-5">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 섹션 6 - FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-xl font-bold text-[#E8E8FF] mb-4 flex items-center gap-2">
            <span className="text-[#C9A96E]">06</span> 자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "타로는 믿어도 되나요?",
                a: "타로는 미래를 100% 예언하는 것이 아니라, 현재 상황과 에너지를 다른 시각으로 바라보게 해주는 도구예요. 재미와 자기 성찰의 목적으로 활용하면 좋아요."
              },
              {
                q: "하루에 여러 번 뽑아도 되나요?",
                a: "같은 질문으로 여러 번 뽑으면 결과가 달라질 수 있어요. 타로는 그 순간의 에너지를 반영하기 때문에, 같은 주제로는 하루 한 번 정도 뽑는 것이 좋아요."
              },
              {
                q: "역방향 카드가 나오면 나쁜 건가요?",
                a: "꼭 그렇지는 않아요. 역방향은 에너지가 막혀있거나 내면을 돌아봐야 한다는 신호일 수 있어요. 정방향보다 더 깊은 성찰이 필요한 상황으로 이해하면 좋아요."
              },
              {
                q: "타로카드는 어떻게 배우나요?",
                a: "메이저 아르카나 22장부터 시작하면 좋아요. 각 카드의 핵심 키워드를 외우고, 3카드 스프레드로 매일 연습하면 빠르게 익힐 수 있어요. 타로던의 카드 해석 페이지를 참고해보세요."
              },
              {
                q: "AI 타로는 정확한가요?",
                a: "타로던의 AI는 카드의 전통적인 의미를 바탕으로 따뜻하고 현실적인 해석을 제공해요. 완벽한 예언보다는 내 상황을 새롭게 바라보는 관점을 얻는다는 마음으로 활용해보세요."
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1A35] border border-[#2D2D5E] rounded-xl p-5">
                <p className="text-[#E8E8FF] text-sm font-medium mb-2">Q. {item.q}</p>
                <p className="text-[#8888AA] text-sm leading-6">A. {item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-8 mb-6">
          <p className="text-[#8888AA] text-sm mb-4">지금 바로 타로를 뽑아보세요</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-[#C9A96E] text-[#C9A96E] rounded-full hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all text-sm tracking-wider"
          >
            ✦ 타로 시작하기
          </Link>
        </div>

      </div>
    </main>
  );
}
