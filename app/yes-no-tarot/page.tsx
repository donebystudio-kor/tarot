"use client";

import { useState } from "react";
import Link from "next/link";
import TarotReader from "@/components/TarotReader";

const YESNO_QUESTIONS = [
  { id: "decision", label: "할지 말지 고민이 돼요", emoji: "🤔", description: "결정을 내리기 어려운 상황" },
  { id: "success", label: "잘 될 수 있을까요?", emoji: "🌟", description: "일의 성공 가능성" },
  { id: "fit", label: "나에게 맞는 선택인가요?", emoji: "💡", description: "이 선택이 나와 맞는지" },
  { id: "outcome", label: "좋은 결과가 날까요?", emoji: "✨", description: "앞으로의 결과와 흐름" },
];

const faqs = [
  {
    q: "YES NO 타로는 어떻게 작동하나요?",
    a: "마음속에 YES 또는 NO로 답할 수 있는 질문을 하나 떠올리고 카드를 뽑으세요. 카드 한 장이 지금 에너지의 흐름을 담아 YES 또는 NO로 명확하게 답해드려요.",
  },
  {
    q: "어떤 질문을 할 수 있나요?",
    a: "'그 사람이 나를 좋아할까?', '이 일이 잘 될까?', '합격할 수 있을까?', '연락이 올까?' 같이 구체적이고 YES/NO로 답할 수 있는 질문이 가장 효과적이에요.",
  },
  {
    q: "타로 YES NO 결과는 얼마나 정확한가요?",
    a: "타로는 현재의 에너지와 흐름을 바탕으로 가능성을 보여줘요. 절대적인 미래를 예언하는 것이 아니라, 지금의 상황에서 어떤 방향으로 흐르고 있는지를 나타내요. 참고와 통찰의 도구로 활용하세요.",
  },
  {
    q: "YES가 나왔는데도 결과가 다를 수 있나요?",
    a: "네, 타로는 현재 에너지의 흐름을 보여주는 것이에요. 이후의 선택과 행동에 따라 결과는 달라질 수 있어요. YES가 나왔다면 지금의 흐름이 긍정적이라는 뜻이에요.",
  },
];

export default function YesNoTarotPage() {
  const [selectedQ, setSelectedQ] = useState<string | null>(null);

  const selected = YESNO_QUESTIONS.find((q) => q.id === selectedQ);

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 처음으로
          </Link>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">✦ Yes or No Tarot</p>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-3">YES NO 타로</h1>
          <p className="text-[#8888AA] text-sm leading-6">
            마음속 질문에 카드 한 장이 답해줘요.<br />
            고민의 유형을 선택하고 카드를 뽑아보세요.
          </p>
        </div>

        {/* 질문 유형 선택 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {YESNO_QUESTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQ(selectedQ === q.id ? null : q.id)}
              className={`rounded-xl p-4 text-center transition-all duration-200 border ${
                selectedQ === q.id
                  ? "border-[#C9A96E] bg-[#C9A96E]/15"
                  : "border-[#2D2D5E] bg-[#1A1A35] hover:border-[#C9A96E]/50"
              }`}
            >
              <div className="text-2xl mb-2">{q.emoji}</div>
              <div className={`font-medium text-sm ${selectedQ === q.id ? "text-[#C9A96E]" : "text-[#E8E8FF]"}`}>
                {q.label}
              </div>
              <div className="text-[#8888AA] text-xs mt-1">{q.description}</div>
            </button>
          ))}
        </div>

        {/* 타로 리더 */}
        <div key={selectedQ ?? "default"} className="fade-in-up">
          <TarotReader
            theme="yesno"
            cardCount={1}
            forcedSubQuestion={selected?.label}
            themeLabel="YES / NO"
            themeEmoji="✨"
          />
        </div>

        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-4 mt-10">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">✦ YES NO 타로란?</p>
          <p className="text-[#E8E8FF] text-sm leading-7">
            YES NO 타로는 하나의 구체적인 질문에 대한 답을 카드로 찾는 방법이에요.
            카드 한 장이 지금의 에너지를 담아 YES 또는 NO로 명확하게 답해드려요.
            연애, 직장, 일상의 고민 등 어떤 질문이든 활용할 수 있어요.
          </p>
        </section>

        <section className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 mb-8">
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-4">✦ 이용 방법</p>
          <ol className="space-y-3">
            {[
              "고민의 유형을 위에서 선택하세요",
              "YES 또는 NO로 답할 수 있는 질문을 마음속으로 떠올리세요",
              "눈을 감고 잠시 그 질문에 집중하며 카드를 1장 뽑으세요",
              "카드 한 장이 에너지를 담아 YES 또는 NO로 답해드려요",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#E8E8FF]">
                <span className="text-[#C9A96E] font-bold shrink-0">{i + 1}.</span>
                <span className="leading-6">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-4">✦ 자주 묻는 질문</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#1A1A35] border border-[#2D2D5E] rounded-xl p-5">
                <p className="text-[#E8E8FF] text-sm font-medium mb-2">{faq.q}</p>
                <p className="text-[#8888AA] text-sm leading-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-10">
          <Link href="/cards" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors">
            타로 카드 의미 보기 →
          </Link>
        </div>

      </div>
    </main>
  );
}
