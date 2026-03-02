import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarot-sigma-wheat.vercel.app"),
  title: "Tarot Done — 타로던",
  description: "AI가 해석하는 타로 카드 리딩. 연애운, 직장운, YES/NO 질문까지. 오늘의 타로로 앞날을 살펴보세요.",
  keywords: ["타로", "타로카드", "무료타로", "타로점", "오늘의타로", "연애운", "직장운", "타로던"],
  openGraph: {
    title: "Tarot Done — 타로던",
    description: "AI가 해석하는 무료 타로 카드 리딩. 오늘의 타로로 앞날을 살펴보세요.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
