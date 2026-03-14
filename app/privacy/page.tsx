import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 타로던",
  description: "타로던 서비스의 개인정보처리방침입니다.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D1E] text-[#E8E8FF] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[#8888AA] text-sm hover:text-[#C9A96E] transition-colors mb-8 inline-block">
          ← 홈으로
        </Link>

        <h1 className="text-2xl font-bold text-[#C9A96E] mb-2">개인정보처리방침</h1>
        <p className="text-[#8888AA] text-sm mb-10">최종 수정일: 2026년 3월 1일</p>

        <div className="space-y-8 text-sm leading-7 text-[#CCCCEE]">

          <section>
            <h2 className="text-[#E8E8FF] text-base font-semibold mb-3">1. 수집하는 개인정보</h2>
            <p>
              타로던(이하 "서비스")은 회원가입 없이 이용 가능하며, 별도의 개인정보를 수집하지 않습니다.
              다만, 서비스 이용 편의를 위해 아래 정보가 사용자 기기에 저장됩니다.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-[#8888AA]">
              <li>오늘의 타로 결과 (브라우저 LocalStorage에 저장, 서버 전송 없음)</li>
              <li>타로 일기 기록 (브라우저 LocalStorage에 저장, 최대 50건, 서버 전송 없음)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E8E8FF] text-base font-semibold mb-3">2. 제3자 서비스</h2>
            <p>본 서비스는 다음 제3자 서비스를 사용합니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-[#8888AA]">
              <li>Vercel — 서비스 호스팅</li>
              <li>Groq API (Llama 모델) — AI 타로 해석 생성</li>
            </ul>
            <p className="mt-3">
              AI 타로 해석 생성 시 사용자가 선택한 카드 정보와 질문 유형만 전송되며, 개인 식별 정보는 포함되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8FF] text-base font-semibold mb-3">3. 개인정보 보유 및 파기</h2>
            <p>
              서버에 개인정보를 저장하지 않습니다.
              브라우저 LocalStorage에 저장된 데이터는 브라우저 설정에서 언제든지 삭제하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8FF] text-base font-semibold mb-3">4. 문의</h2>
            <p>
              개인정보 관련 문의사항은 아래로 연락 주시기 바랍니다.
            </p>
            <p className="mt-2 text-[#8888AA]">이메일: donebystudio@gmail.com</p>
          </section>

        </div>
      </div>
    </div>
  );
}
