import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YES NO 타로 무료 — 투데이타로",
  description: "마음속 질문에 YES 또는 NO로 답하는 무료 타로 리딩. 고민되는 질문을 떠올리고 카드를 뽑아보세요.",
  keywords: ["YES NO 타로", "예스노 타로", "타로 YES OR NO", "질문 타로", "고민 타로", "무료 타로"],
};

export default function YesNoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
