"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDiaryEntries, deleteDiaryEntry, DiaryEntry } from "@/services/diary";

export default function DiaryClient() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    setEntries(getDiaryEntries());
  }, []);

  const handleDelete = (idx: number) => {
    deleteDiaryEntry(idx);
    setEntries(getDiaryEntries());
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-[#0D0D1E] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-6 inline-block">
            ← 홈으로
          </Link>
          <h1 className="text-3xl font-bold text-[#E8E8FF] mb-2">📖 타로 일기</h1>
          <p className="text-[#8888AA] text-sm">나의 타로 리딩 기록</p>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#8888AA] text-sm mb-4">아직 저장된 리딩이 없어요</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 border border-[#C9A96E] text-[#C9A96E] rounded-full hover:bg-[#C9A96E] hover:text-[#0D0D1E] transition-all text-sm"
            >
              ✦ 타로 뽑으러 가기
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, idx) => (
              <div
                key={`${entry.date}-${idx}`}
                className="bg-[#1A1A35] border border-[#2D2D5E] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#252545] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{entry.themeEmoji}</span>
                    <div>
                      <p className="text-[#E8E8FF] text-sm font-medium">{entry.theme}</p>
                      <p className="text-[#8888AA] text-xs">{formatDate(entry.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {entry.cards.map((c) => (
                        <span key={c.id} className="text-sm">{c.symbol}</span>
                      ))}
                    </div>
                    <span className="text-[#8888AA] text-xs">{expandedIdx === idx ? "▲" : "▼"}</span>
                  </div>
                </button>

                {expandedIdx === idx && (
                  <div className="px-5 pb-5 border-t border-[#2D2D5E]">
                    {entry.subQuestion && (
                      <p className="text-[#C9A96E] text-xs mt-4 mb-2">"{entry.subQuestion}"</p>
                    )}

                    <div className="flex gap-2 mt-3 mb-4 flex-wrap">
                      {entry.cards.map((c) => (
                        <span
                          key={c.id}
                          className="text-xs px-3 py-1 rounded-full border border-[#2D2D5E] text-[#E8E8FF]"
                        >
                          {c.symbol} {c.nameKo}{c.isReversed ? " (역)" : ""}
                        </span>
                      ))}
                    </div>

                    <p className="text-[#E8E8FF] text-sm leading-7 whitespace-pre-wrap mb-4">{entry.reading}</p>

                    {entry.minorAdvice && (
                      <div className="bg-[#0D0D1E] border border-[#C9A96E]/20 rounded-xl p-4 mb-4">
                        <p className="text-[#C9A96E] text-xs mb-2">🃏 마이너 카드 조언</p>
                        <p className="text-[#E8E8FF] text-xs mb-2">
                          {entry.minorAdvice.symbol} {entry.minorAdvice.nameKo}
                          {entry.minorAdvice.isReversed ? " (역)" : ""}
                        </p>
                        <p className="text-[#E8E8FF] text-sm leading-6 whitespace-pre-wrap">
                          {entry.minorAdvice.reading}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => handleDelete(idx)}
                      className="text-[#8888AA] text-xs hover:text-red-400 transition-colors"
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
