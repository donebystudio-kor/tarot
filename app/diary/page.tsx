import type { Metadata } from "next";
import DiaryClient from "./DiaryClient";

export const metadata: Metadata = {
  title: "타로 일기 — 타로던",
  description: "나의 타로 리딩 기록을 한눈에 확인해보세요.",
};

export default function DiaryPage() {
  return <DiaryClient />;
}
