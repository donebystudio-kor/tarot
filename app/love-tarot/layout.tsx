import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "애정운 타로 무료 리딩 — 타로던",
  description: "솔로운, 커플운, 재회운까지. AI 타로로 지금 내 연애의 흐름과 상대방 속마음을 확인해보세요.",
  keywords: ["애정운 타로", "연애 타로", "솔로 타로", "커플 타로", "재회 타로", "무료 타로", "타로던"],
};

export default function LoveTarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
