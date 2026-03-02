import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "학업운 타로 무료 리딩 — 타로던",
  description: "시험운, 공부 흐름, 진로·선택까지. AI 타로로 학업과 진로의 방향을 확인해보세요.",
  keywords: ["학업운 타로", "시험 타로", "진로 타로", "공부 타로", "합격 타로", "무료 타로", "타로던"],
};

export default function StudyTarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
