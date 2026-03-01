"use client";

import { TarotCard as TarotCardType } from "@/constants/tarot";

interface TarotCardProps {
  card?: TarotCardType;
  isReversed?: boolean;
  isFlipped?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  position?: string;
  onClick?: () => void;
}

export default function TarotCard({
  card,
  isReversed = false,
  isFlipped = false,
  isSelected = false,
  isDisabled = false,
  position,
  onClick,
}: TarotCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {position && (
        <span className="text-xs text-[#C9A96E] tracking-widest uppercase">{position}</span>
      )}
      <div
        className={`card-flip-container w-28 h-44 ${!isDisabled && onClick ? "tarot-card-hover" : ""} ${isFlipped ? "flipped" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
      >
        <div className="card-flip-inner">
          {/* 앞면 - 미지의 카드 */}
          <div
            className={`card-front w-full h-full rounded-xl border-2 flex items-center justify-center
              ${isSelected
                ? "border-[#C9A96E] bg-[#252545] shadow-[0_0_20px_rgba(201,169,110,0.5)]"
                : "border-[#2D2D5E] bg-[#1A1A35]"
              }`}
          >
            <div className="flex flex-col items-center gap-1 select-none">
              <div className="text-2xl opacity-60">✦</div>
              <div className="grid grid-cols-3 gap-1 opacity-30">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="text-[8px] text-[#C9A96E]">✦</span>
                ))}
              </div>
              <div className="text-2xl opacity-60">✦</div>
            </div>
          </div>

          {/* 뒷면 - 카드 공개 */}
          <div
            className={`card-back w-full h-full rounded-xl border-2 border-[#C9A96E] bg-[#1A1A35]
              flex flex-col items-center justify-center gap-2 p-2
              ${isReversed ? "rotate-180" : ""}`}
          >
            {card && (
              <>
                <span className="text-2xl">{card.symbol}</span>
                <div className="text-center">
                  <p className="text-[#C9A96E] text-xs font-semibold leading-tight">{card.nameKo}</p>
                  {isReversed && (
                    <p className="text-[#8888AA] text-[9px] mt-0.5">역방향</p>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-0.5">
                  {card.keywords.slice(0, 2).map((kw) => (
                    <span key={kw} className="text-[8px] text-[#9B8EC4] bg-[#252545] px-1 py-0.5 rounded">
                      {kw}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
