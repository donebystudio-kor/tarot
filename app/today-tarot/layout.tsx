import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 운세 타로 무료 리딩 — 투데이타로",
  description: "AI가 해석하는 오늘의 운세 타로. 오늘 하루의 흐름을 카드 3장으로 확인해보세요.",
  keywords: ["오늘의 운세 타로", "일일 타로", "오늘 타로", "무료 타로", "오늘의 타로 리딩"],
};

export default function TodayTarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
