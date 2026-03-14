"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { MAJOR_ARCANA, MINOR_ARCANA, THEMES, TarotCard as TarotCardType } from "@/constants/tarot";
import TarotCard from "@/components/TarotCard";
import TypewriterText from "@/components/TypewriterText";
import { saveDiaryEntry } from "@/services/diary";

interface SelectedCard {
  card: TarotCardType;
  isReversed: boolean;
}

function shuffleAndPick(count: number): SelectedCard[] {
  const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    card,
    isReversed: Math.random() > 0.7,
  }));
}

function getTodayKey(theme: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `tarot-done-${theme}-${today}`;
}

interface SavedReading {
  cards: { id: number; nameKo: string; slug: string; isReversed: boolean }[];
  reading: string;
  subQuestion: string;
}

interface Props {
  theme: string;
  questions?: string[];
  themeLabel?: string;
  themeEmoji?: string;
  cardCount?: number;
  forcedSubQuestion?: string;
}

const QUESTION_POSITIONS: Record<string, [string, string, string]> = {
  // 솔로운
  "새로운 인연이 올까요?": ["현재 연애 에너지", "다가올 변화", "인연의 가능성"],
  "연락이 올까요?": ["상대방의 현재 상태", "두 사람 사이의 에너지", "연락 가능성"],
  "나를 좋아할까요?": ["상대방의 나에 대한 인식", "현재 감정 상태", "앞으로의 관계"],
  "고백해도 될까요?": ["현재 관계 에너지", "상대방의 감정", "고백 후 흐름"],
  "언제 연애할 수 있을까요?": ["현재 연애 준비 상태", "변화의 흐름", "인연이 찾아오는 시기"],
  // 커플운
  "상대방 속마음이 궁금해요": ["상대방의 과거 감정", "현재 속마음", "앞으로의 태도"],
  "이 관계가 오래갈까요?": ["현재 관계의 기반", "두 사람 사이의 과제", "미래 관계의 흐름"],
  "우리 잘 될 수 있을까요?": ["관계의 현재 에너지", "주의해야 할 것", "앞으로의 가능성"],
  "권태기를 극복할 수 있을까요?": ["권태기의 원인", "두 사람에게 필요한 것", "관계 회복 방향"],
  "결혼까지 갈 수 있을까요?": ["현재 관계 수준", "결혼으로 가는 과정", "결혼 가능성"],
  // 재회운
  "재회 가능성이 있을까요?": ["두 사람 사이에 남은 것", "재회를 가로막는 것", "재회 가능성과 타이밍"],
  "상대방이 먼저 연락할까요?": ["상대방의 현재 감정", "연락을 고민하는 상대방의 마음", "연락 가능성"],
  "먼저 연락해도 될까요?": ["현재 두 사람의 에너지", "상대방이 느낄 반응", "연락 후 흐름"],
  "다시 사귈 수 있을까요?": ["이별 후 변화", "재결합의 가능성", "함께하는 미래"],
  "이별 후 어떻게 해야 할까요?": ["현재 감정 상태", "놓아야 할 것", "앞으로 나아갈 방향"],
  // 직장운 - 현재 직장 흐름
  "지금 회사에서 제 위치는 어떤가요?": ["현재 내 직장 에너지", "주변의 시각", "앞으로의 흐름"],
  "상사(또는 동료)가 저를 어떻게 보고 있나요?": ["상대방의 나에 대한 인식", "현재 관계 에너지", "앞으로의 관계"],
  "지금 이 직장을 계속 다니는 게 좋을까요?": ["현재 직장의 에너지", "떠나거나 남을 때의 흐름", "최선의 선택"],
  "최근 일이 잘 안 풀리는 이유는 무엇인가요?": ["막힘의 원인", "현재 상태", "풀어나갈 방향"],
  // 직장운 - 이직/이동운
  "이직을 준비하면 좋은 결과가 있을까요?": ["현재 이직 에너지", "이직 과정의 흐름", "결과와 가능성"],
  "지금 이직 타이밍이 맞을까요?": ["현재 상황", "타이밍의 흐름", "최적의 시기"],
  "옮기게 된다면 더 좋은 환경인가요?": ["현재 환경", "새 환경의 에너지", "변화 후 흐름"],
  "새로운 제안이 들어올 가능성이 있나요?": ["현재 기회의 흐름", "주변 에너지", "제안 가능성"],
  // 직장운 - 성과/승진/금전
  "승진 가능성이 있을까요?": ["현재 역량과 평가", "승진을 가로막는 것", "승진 가능성"],
  "이번 프로젝트 결과는 어떨까요?": ["프로젝트 현재 에너지", "주의해야 할 것", "결과의 흐름"],
  "연봉 인상 운이 있나요?": ["현재 금전 에너지", "인상의 가능성", "시기와 결과"],
  "직장에서 저를 시기하는 사람이 있나요?": ["주변 에너지", "숨겨진 관계", "대처 방향"],
  "노력한 만큼 인정받을 수 있을까요?": ["현재 노력의 에너지", "평가받는 흐름", "인정의 가능성"],
  // 학업운 - 시험운
  "이번 시험 결과는 어떨까요?": ["현재 준비 상태", "시험장에서의 에너지", "결과의 흐름"],
  "합격 가능성은 얼마나 되나요?": ["현재 실력 에너지", "합격을 가로막는 것", "합격 가능성"],
  "실수할 가능성이 있나요?": ["현재 불안 요소", "집중력 상태", "시험 당일 흐름"],
  "지금 공부 방향이 맞나요?": ["현재 방향의 에너지", "개선할 부분", "올바른 방향"],
  // 학업운 - 공부 흐름
  "요즘 집중력이 떨어진 이유는 무엇인가요?": ["집중력 저하 원인", "현재 내면 상태", "회복 방향"],
  "공부 효율을 높이려면 어떻게 해야 할까요?": ["현재 공부 에너지", "개선이 필요한 부분", "효율적인 방향"],
  "지금 쉬어가는 게 좋을까요?": ["현재 에너지 상태", "휴식의 필요성", "재충전 후 흐름"],
  "슬럼프가 언제쯤 끝날까요?": ["슬럼프의 원인", "현재 상태", "회복의 타이밍"],
  // 학업운 - 진로/선택
  "지금 선택하려는 전공이 맞나요?": ["나의 적성 에너지", "선택의 흐름", "미래 가능성"],
  "진로 방향을 바꾸는 게 좋을까요?": ["현재 진로 에너지", "변화의 흐름", "최선의 방향"],
  "저에게 맞는 분야는 무엇인가요?": ["나의 강점 에너지", "숨겨진 가능성", "앞으로의 방향"],
  // 오늘의 전체 흐름
  "오늘 하루의 전반적인 기운은 어떤가요?": ["아침의 에너지", "낮의 흐름", "저녁의 마무리"],
  "오늘 조심해야 할 일이 있을까요?": ["주의가 필요한 부분", "숨겨진 위험", "대처 방향"],
  "오늘 저에게 들어오는 기회는 무엇인가요?": ["현재 기회의 씨앗", "기회를 키우는 에너지", "기회의 결실"],
  "오늘 운이 좋은 시간대가 있을까요?": ["오전의 에너지", "오후의 흐름", "행운의 타이밍"],
  "오늘 제 감정 상태는 어떨까요?": ["현재 내면의 감정", "감정에 영향을 주는 것", "감정의 흐름"],
  // 오늘의 행운 포인트
  "오늘 행운을 부르는 행동은 무엇인가요?": ["현재 에너지 상태", "행운을 끌어당기는 것", "오늘의 행동 방향"],
  "오늘 피해야 할 선택은 무엇인가요?": ["현재 상황", "피해야 할 에너지", "대안적 방향"],
  "오늘 저에게 좋은 색깔 / 숫자는?": ["오늘의 에너지 색", "행운의 숫자 흐름", "활용 방법"],
  "오늘 연락이 오거나 만날 사람이 있을까요?": ["상대방의 에너지", "두 사람 사이의 흐름", "만남의 가능성"],
  "오늘 예상치 못한 일이 생길까요?": ["숨겨진 변화의 씨앗", "변화의 흐름", "대응 방향"],
  // 인간관계 운
  "오늘 누군가와 갈등이 생길까요?": ["관계의 현재 에너지", "갈등의 원인", "해결 방향"],
  "오늘 저를 도와줄 사람이 있나요?": ["주변의 에너지", "도움의 가능성", "어떻게 받아들일지"],
  "오늘 새로운 인연을 만날 가능성이 있나요?": ["현재 인연의 에너지", "다가올 만남", "인연의 가능성"],
  "오늘 먼저 연락하는 게 좋을까요?": ["현재 관계 에너지", "상대방의 상태", "연락 후 흐름"],
};

export default function TarotReader({ theme, questions, themeLabel, themeEmoji, cardCount = 3, forcedSubQuestion }: Props) {
  const [step, setStep] = useState<"pick" | "result">("pick");
  const [deck, setDeck] = useState<SelectedCard[]>(() => shuffleAndPick(12));
  const [selected, setSelected] = useState<SelectedCard[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>(Array(cardCount).fill(false));
  const [reading, setReading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subQuestion, setSubQuestion] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedToday, setSavedToday] = useState<SavedReading | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [minorAdvice, setMinorAdvice] = useState<{ card: TarotCardType; isReversed: boolean; reading: string } | null>(null);
  const [minorLoading, setMinorLoading] = useState(false);
  const [diarySaved, setDiarySaved] = useState(false);

  const activeSubQuestion = forcedSubQuestion || subQuestion;
  const selectedTheme = THEMES.find((t) => t.id === theme);
  const activePositions: [string, string, string] =
    (activeSubQuestion && QUESTION_POSITIONS[activeSubQuestion]) || ["과거", "현재", "미래"];

  // 오늘 저장된 리딩 불러오기
  useEffect(() => {
    try {
      const key = getTodayKey(theme);
      const raw = localStorage.getItem(key);
      if (raw) setSavedToday(JSON.parse(raw));
    } catch {}
  }, [theme]);

  // 리딩 완료 시 localStorage에 저장
  useEffect(() => {
    if (!isLoading && reading && !reading.startsWith("카드가 잠시")) {
      try {
        const key = getTodayKey(theme);
        const data: SavedReading = {
          cards: selected.map((s) => ({
            id: s.card.id,
            nameKo: s.card.nameKo,
            slug: s.card.slug,
            isReversed: s.isReversed,
          })),
          reading,
          subQuestion: activeSubQuestion,
        };
        localStorage.setItem(key, JSON.stringify(data));
        setSavedToday(data);
      } catch {}
    }
  }, [isLoading, reading]);

  const handleCardPick = (idx: number) => {
    // 이미 선택된 카드 클릭 시 취소
    if (selected.some((s) => s.card.id === deck[idx].card.id)) {
      setSelected((prev) => prev.filter((s) => s.card.id !== deck[idx].card.id));
      return;
    }
    if (selected.length >= cardCount) return;
    const newSelected = [...selected, deck[idx]];
    setSelected(newSelected);
    if (newSelected.length === cardCount) {
      setTimeout(() => startReading(newSelected), 300);
    }
  };

  const startReading = async (cards: SelectedCard[], retryCount = 0) => {
    if (retryCount === 0) {
      setStep("result");
      setFlipped(Array(cardCount).fill(false));
      setIsLoading(true);

      for (let i = 0; i < cardCount; i++) {
        await new Promise((r) => setTimeout(r, i * 700 + 400));
        setFlipped((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }
    }

    setReading("");

    let shouldRetry = false;

    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards: cards.map((c) => ({
            name: c.card.name,
            nameKo: c.card.nameKo,
            isReversed: c.isReversed,
          })),
          theme,
          subQuestion: activeSubQuestion || undefined,
        }),
      });

      if (!res.ok) {
        setReading("카드가 잠시 말을 잃었어요.\n잠시 후 다시 시도해주세요.");
        return;
      }
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      let lastActivity = Date.now();
      const stall = { triggered: false };

      const stallInterval = setInterval(() => {
        if (Date.now() - lastActivity > 8000) {
          stall.triggered = true;
          clearInterval(stallInterval);
          reader.cancel();
        }
      }, 1000);

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (stall.triggered) {
            if (retryCount < 2) shouldRetry = true;
            break;
          }
          if (done) break;
          lastActivity = Date.now();
          full += decoder.decode(value, { stream: true });
          setReading(full);
        }
      } catch {
        if (stall.triggered && retryCount < 2) shouldRetry = true;
      } finally {
        clearInterval(stallInterval);
      }
    } catch {
      setReading("카드가 잠시 말을 잃었어요.\n잠시 후 다시 시도해주세요.");
    } finally {
      if (!shouldRetry) setIsLoading(false);
    }

    if (shouldRetry) {
      startReading(cards, retryCount + 1);
    }
  };

  const handleReset = useCallback(() => {
    setStep("pick");
    setSelected([]);
    setDeck(shuffleAndPick(12));
    setFlipped(Array(cardCount).fill(false));
    setReading("");
    setSubQuestion("");
    setMinorAdvice(null);
    setDiarySaved(false);
  }, [cardCount]);

  const handleShuffle = () => {
    if (selected.length > 0 || isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setDeck(shuffleAndPick(12));
      setIsShuffling(false);
    }, 950); // 카드 9장 * 40ms 딜레이 + 550ms 애니메이션
  };

  const handleAutoPick = () => {
    if (selected.length > 0) return;
    const autoPicked = shuffleAndPick(cardCount);
    setSelected(autoPicked);
    setTimeout(() => startReading(autoPicked), 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reading).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleMinorAdvice = async () => {
    if (minorLoading || minorAdvice) return;
    setMinorLoading(true);
    const shuffled = [...MINOR_ARCANA].sort(() => Math.random() - 0.5);
    const card = shuffled[0];
    const isReversed = Math.random() > 0.7;
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards: [{ name: card.name, nameKo: card.nameKo, isReversed }],
          theme: "advice",
          subQuestion: activeSubQuestion || undefined,
        }),
      });
      if (!res.ok || !res.body) {
        setMinorAdvice({ card, isReversed, reading: "카드가 잠시 말을 잃었어요." });
        setMinorLoading(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMinorAdvice({ card, isReversed, reading: full });
      }
    } catch {
      setMinorAdvice({ card, isReversed, reading: "카드가 잠시 말을 잃었어요." });
    } finally {
      setMinorLoading(false);
    }
  };

  const handleSaveDiary = () => {
    if (diarySaved) return;
    saveDiaryEntry({
      date: new Date().toISOString(),
      theme: themeLabel || selectedTheme?.label || theme,
      themeEmoji: themeEmoji || selectedTheme?.emoji || "🔮",
      subQuestion: activeSubQuestion,
      cards: selected.map((s) => ({
        id: s.card.id,
        nameKo: s.card.nameKo,
        slug: s.card.slug,
        symbol: s.card.symbol,
        isReversed: s.isReversed,
      })),
      reading,
      minorAdvice: minorAdvice ? {
        id: minorAdvice.card.id,
        nameKo: minorAdvice.card.nameKo,
        slug: minorAdvice.card.slug,
        symbol: minorAdvice.card.symbol,
        isReversed: minorAdvice.isReversed,
        reading: minorAdvice.reading,
      } : undefined,
    });
    setDiarySaved(true);
    setTimeout(() => setDiarySaved(false), 2000);
  };

  const handleRestoreSaved = () => {
    if (!savedToday) return;
    const restored: SelectedCard[] = savedToday.cards.map((c) => ({
      card: MAJOR_ARCANA.find((m) => m.id === c.id)!,
      isReversed: c.isReversed,
    })).filter((c) => c.card);
    setSelected(restored);
    setFlipped(Array(restored.length).fill(true));
    setReading(savedToday.reading);
    setSubQuestion(savedToday.subQuestion);
    setStep("result");
  };

  return (
    <div className="w-full">
      {/* 카드 선택 */}
      {step === "pick" && (
        <div className="fade-in-up">

          {/* 오늘 이미 뽑은 경우 배너 */}
          {savedToday && (
            <div className="mb-6 bg-[#1A1A35] border border-[#C9A96E]/30 rounded-xl p-4 text-center">
              <p className="text-[#C9A96E] text-xs mb-3">✦ 오늘 이미 카드를 뽑으셨어요</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRestoreSaved}
                  className="px-4 py-2 border border-[#C9A96E] text-[#C9A96E] rounded-full text-xs hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all duration-200"
                >
                  이전 결과 보기
                </button>
                <button
                  onClick={() => setSavedToday(null)}
                  className="px-4 py-2 border border-[#2D2D5E] text-[#8888AA] rounded-full text-xs hover:border-[#8888AA] transition-all duration-200"
                >
                  새로 뽑기
                </button>
              </div>
            </div>
          )}

          {/* 질문 칩 — forcedSubQuestion이 있으면 숨김 */}
          {!forcedSubQuestion && questions && questions.length > 0 && (
            <div className="mb-6">
              <p className="text-[#8888AA] text-xs text-center mb-3">
                마음속 질문을 선택하거나 그냥 뽑아도 돼요 (선택)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {questions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      const newQ = subQuestion === q ? "" : q;
                      if (selected.length > 0) {
                        setStep("pick");
                        setSelected([]);
                        setDeck(shuffleAndPick(12));
                        setFlipped(Array(cardCount).fill(false));
                        setReading("");
                      }
                      setSubQuestion(newQ);
                    }}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                      subQuestion === q
                        ? "border-[#C9A96E] bg-[#C9A96E]/15 text-[#C9A96E]"
                        : "border-[#2D2D5E] bg-[#1A1A35] text-[#8888AA] hover:border-[#C9A96E]/50 hover:text-[#C9A96E]/70"
                    }`}
                  >
                    {subQuestion === q && <span className="mr-1">✦</span>}
                    {q}
                  </button>
                ))}
              </div>
              {subQuestion && (
                <p className="text-center text-[#C9A96E] text-xs mt-3">
                  "{subQuestion}" 에 집중하며 카드를 뽑으세요
                </p>
              )}
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-[#E8E8FF] text-lg">
              {cardCount === 1 ? "마음을 모으고 카드를 1장 선택하세요" : "마음을 가라앉히고 카드를 3장 선택하세요"}
            </p>
            <p className="text-[#8888AA] text-sm mt-1">
              {cardCount === 1 ? (
                selected.length === 0 ? "운명의 카드 한 장이 답을 알려줄 거예요" : "✦ 카드를 해석하는 중..."
              ) : (
                <>
                  {selected.length === 0 && `첫 번째 카드 — ${activePositions[0]}`}
                  {selected.length === 1 && `두 번째 카드 — ${activePositions[1]}`}
                  {selected.length === 2 && `세 번째 카드 — ${activePositions[2]}`}
                  {selected.length === 3 && "✦ 카드를 해석하는 중..."}
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {deck.map((item, idx) => {
              const isChosen = selected.some((s) => s.card.id === item.card.id);
              return (
                <div
                  key={item.card.id}
                  className={isShuffling ? "shuffle-wave" : ""}
                  style={isShuffling ? { animationDelay: `${idx * 40}ms` } : undefined}
                >
                  <TarotCard
                    isSelected={isChosen}
                    isDisabled={(!isChosen && selected.length >= cardCount) || isShuffling}
                    onClick={() => handleCardPick(idx)}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: cardCount }, (_, i) => i).map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < selected.length ? "bg-[#C9A96E]" : "bg-[#2D2D5E]"
                }`}
              />
            ))}
          </div>

          {selected.length === 0 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleShuffle}
                className="px-5 py-2 border border-[#2D2D5E] text-[#8888AA] rounded-full text-xs
                  hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-200"
              >
                🔀 셔플
              </button>
              <button
                onClick={handleAutoPick}
                className="px-5 py-2 border border-[#2D2D5E] text-[#8888AA] rounded-full text-xs
                  hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-200"
              >
                ✦ 자동 뽑기
              </button>
            </div>
          )}
        </div>
      )}

      {/* 결과 */}
      {step === "result" && (
        <div className="fade-in-up">
          <div className="text-center mb-6">
            <p className="text-[#C9A96E] text-sm mb-1">{themeEmoji || selectedTheme?.emoji} {themeLabel || selectedTheme?.label}</p>
            {activeSubQuestion && (
              <p className="text-[#8888AA] text-xs mb-1">"{activeSubQuestion}"</p>
            )}
            <p className="text-[#E8E8FF] text-lg">카드가 전하는 메시지</p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {selected.map((item, i) => (
              <div key={item.card.id} className="flex flex-col items-center gap-2">
                <TarotCard
                  card={item.card}
                  isReversed={item.isReversed}
                  isFlipped={flipped[i]}
                  position={cardCount > 1 ? activePositions[i] : undefined}
                />
                {flipped[i] && (
                  <Link
                    href={`/cards/${item.card.slug}`}
                    className="text-[#8888AA] text-xs hover:text-[#C9A96E] transition-colors"
                  >
                    카드 해석 →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#1A1A35] border border-[#2D2D5E] rounded-2xl p-6 min-h-[120px]">
            <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-4">✦ 카드의 메시지</p>
            {isLoading && reading === "" ? (
              <div className="flex items-center gap-2 text-[#8888AA] text-sm">
                <span className="animate-pulse">✦</span>
                <span>카드를 해석하는 중...</span>
              </div>
            ) : (
              <TypewriterText
                text={reading}
                speed={15}
                className="text-[#E8E8FF] text-sm leading-7 whitespace-pre-wrap"
              />
            )}
          </div>

          {!isLoading && reading && (
            <>
              {/* 마이너 카드 조언 */}
              {!minorAdvice && !minorLoading && (
                <div className="text-center mt-6 fade-in-up">
                  <button
                    onClick={handleMinorAdvice}
                    className="px-6 py-3 bg-[#1A1A35] border border-[#C9A96E]/50 text-[#C9A96E] rounded-full
                      hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all duration-200 text-sm"
                  >
                    🃏 마이너 카드로 조언 받기
                  </button>
                </div>
              )}

              {minorLoading && !minorAdvice && (
                <div className="text-center mt-6">
                  <span className="text-[#8888AA] text-sm animate-pulse">✦ 마이너 카드를 뽑는 중...</span>
                </div>
              )}

              {minorAdvice && (
                <div className="mt-6 bg-[#1A1A35] border border-[#C9A96E]/30 rounded-2xl p-6 fade-in-up">
                  <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">🃏 마이너 카드의 조언</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{minorAdvice.card.symbol}</span>
                    <div>
                      <p className="text-[#E8E8FF] text-sm font-medium">
                        {minorAdvice.card.nameKo}
                        {minorAdvice.isReversed && <span className="text-[#8888AA] text-xs ml-1">(역방향)</span>}
                      </p>
                      <p className="text-[#8888AA] text-xs">{minorAdvice.card.keywords.join(" · ")}</p>
                    </div>
                  </div>
                  <TypewriterText
                    text={minorAdvice.reading}
                    speed={15}
                    className="text-[#E8E8FF] text-sm leading-7 whitespace-pre-wrap"
                  />
                </div>
              )}

              <div className="flex justify-center gap-3 mt-8 fade-in-up flex-wrap">
                <button
                  onClick={handleSaveDiary}
                  className="px-6 py-3 border border-[#2D2D5E] text-[#8888AA] rounded-full
                    hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-200 text-sm"
                >
                  {diarySaved ? "✦ 저장됨!" : "📖 일기에 저장"}
                </button>
                <button
                  onClick={handleCopy}
                  className="px-6 py-3 border border-[#2D2D5E] text-[#8888AA] rounded-full
                    hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-200 text-sm"
                >
                  {copied ? "✦ 복사됨!" : "결과 복사"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 border border-[#C9A96E] text-[#C9A96E] rounded-full
                    hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all duration-200 text-sm tracking-wider"
                >
                  ✦ 다시 뽑기
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
