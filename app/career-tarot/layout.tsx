import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "직장운 타로 무료 리딩 — 타로던",
  description: "현재 직장 흐름, 이직·이동운, 성과·승진·금전까지. AI 타로로 커리어의 방향을 확인해보세요.",
  keywords: ["직장운 타로", "이직 타로", "승진 타로", "커리어 타로", "직장 타로", "무료 타로", "타로던"],
};

export default function CareerTarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
