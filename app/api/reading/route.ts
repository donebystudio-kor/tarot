import { NextRequest } from "next/server";

function filterKorean(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // 이모지 (서로게이트 페어) — 두 글자 묶어서 보존
    if (code >= 0xD800 && code <= 0xDBFF) {
      result += text[i] + (text[i + 1] ?? "");
      i++;
      continue;
    }
    // 한글 음절
    if (code >= 0xAC00 && code <= 0xD7A3) { result += text[i]; continue; }
    // 한글 자모
    if (code >= 0x1100 && code <= 0x11FF) { result += text[i]; continue; }
    // 한글 호환 자모
    if (code >= 0x3130 && code <= 0x318F) { result += text[i]; continue; }
    // ASCII (숫자, 영문, 기호, 공백)
    if (code >= 0x0020 && code <= 0x007E) { result += text[i]; continue; }
    // 줄바꿈, 탭
    if (code === 0x000A || code === 0x000D || code === 0x0009) { result += text[i]; continue; }
    // 기타 특수기호 (✦ ✨ 등)
    if (code >= 0x2600 && code <= 0x27BF) { result += text[i]; continue; }
    // 이모지 variation selector
    if (code >= 0xFE00 && code <= 0xFE0F) { result += text[i]; continue; }
    // 나머지 (한자, 일본어, 러시아어, 힌디어 등) 제거
  }
  return result;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("API 키가 설정되지 않았습니다.", { status: 500 });
  }

  const { cards, theme, subQuestion } = await req.json();

  const themeLabel: Record<string, string> = {
    general: "오늘의 운세",
    general_flow: "오늘의 전체 흐름",
    general_luck: "오늘의 행운 포인트",
    general_relation: "인간관계 운",
    love_solo: "솔로운 (새로운 인연과 설렘)",
    love_couple: "커플운 (현재 연인과의 관계)",
    love_reunion: "재회운 (이별 후 재회 가능성)",
    career: "직장운",
    career_current: "직장운 - 현재 직장 흐름",
    career_move: "직장운 - 이직·이동운",
    career_achieve: "직장운 - 성과·승진·금전",
    study: "학업운",
    study_exam: "학업운 - 시험운",
    study_flow: "학업운 - 공부 흐름",
    study_path: "학업운 - 진로·선택",
    yesno: "YES or NO 질문",
    advice: "마이너 카드 조언",
  };

  // 세부 질문별 맞춤 3카드 포지션
  const questionPositions: Record<string, [string, string, string]> = {
    // 솔로운
    "새로운 인연이 올까요?": ["현재 연애 에너지", "다가올 변화", "인연의 가능성"],
    "연락이 올까요?": ["상대방의 현재 상태", "두 사람 사이의 에너지", "연락 가능성"],
    "나를 좋아할까요?": ["상대방의 나에 대한 인식", "현재 감정 상태", "앞으로의 관계"],
    "고백해도 될까요?": ["현재 관계 에너지", "상대방의 감정", "고백 후 흐름"],
    "언제 연애할 수 있을까요?": ["현재 연애 준비 상태", "변화의 흐름", "인연이 찾아오는 시기"],
    // 커플운
    "상대방 속마음이 궁금해요": ["상대방의 과거 감정", "현재 속마음", "앞으로의 태도"],
    "이 관계가 오래갈까요?": ["현재 관계의 기반", "두 사람 사이의 과제", "미래 관계의 흐름"],
    "우리 잘 될 수 있을까요?": ["관계의 현재 에너지", "주의해야 할 것", "앞으로의 가능성"],
    "권태기를 극복할 수 있을까요?": ["권태기의 원인", "두 사람에게 필요한 것", "관계 회복 방향"],
    "결혼까지 갈 수 있을까요?": ["현재 관계 수준", "결혼으로 가는 과정", "결혼 가능성"],
    // 재회운
    "재회 가능성이 있을까요?": ["두 사람 사이에 남은 것", "재회를 가로막는 것", "재회 가능성과 타이밍"],
    "상대방이 먼저 연락할까요?": ["상대방의 현재 감정", "연락을 고민하는 상대방의 마음", "연락 가능성"],
    "먼저 연락해도 될까요?": ["현재 두 사람의 에너지", "상대방이 느낄 반응", "연락 후 흐름"],
    "다시 사귈 수 있을까요?": ["이별 후 변화", "재결합의 가능성", "함께하는 미래"],
    "이별 후 어떻게 해야 할까요?": ["현재 감정 상태", "놓아야 할 것", "앞으로 나아갈 방향"],
    // 직장운 - 현재 직장 흐름
    "지금 회사에서 제 위치는 어떤가요?": ["현재 내 직장 에너지", "주변의 시각", "앞으로의 흐름"],
    "상사(또는 동료)가 저를 어떻게 보고 있나요?": ["상대방의 나에 대한 인식", "현재 관계 에너지", "앞으로의 관계"],
    "지금 이 직장을 계속 다니는 게 좋을까요?": ["현재 직장의 에너지", "떠나거나 남을 때의 흐름", "최선의 선택"],
    "최근 일이 잘 안 풀리는 이유는 무엇인가요?": ["막힘의 원인", "현재 상태", "풀어나갈 방향"],
    // 직장운 - 이직/이동운
    "이직을 준비하면 좋은 결과가 있을까요?": ["현재 이직 에너지", "이직 과정의 흐름", "결과와 가능성"],
    "지금 이직 타이밍이 맞을까요?": ["현재 상황", "타이밍의 흐름", "최적의 시기"],
    "옮기게 된다면 더 좋은 환경인가요?": ["현재 환경", "새 환경의 에너지", "변화 후 흐름"],
    "새로운 제안이 들어올 가능성이 있나요?": ["현재 기회의 흐름", "주변 에너지", "제안 가능성"],
    // 직장운 - 성과/승진/금전
    "승진 가능성이 있을까요?": ["현재 역량과 평가", "승진을 가로막는 것", "승진 가능성"],
    "이번 프로젝트 결과는 어떨까요?": ["프로젝트 현재 에너지", "주의해야 할 것", "결과의 흐름"],
    "연봉 인상 운이 있나요?": ["현재 금전 에너지", "인상의 가능성", "시기와 결과"],
    "직장에서 저를 시기하는 사람이 있나요?": ["주변 에너지", "숨겨진 관계", "대처 방향"],
    "노력한 만큼 인정받을 수 있을까요?": ["현재 노력의 에너지", "평가받는 흐름", "인정의 가능성"],
    // 학업운 - 시험운
    "이번 시험 결과는 어떨까요?": ["현재 준비 상태", "시험장에서의 에너지", "결과의 흐름"],
    "합격 가능성은 얼마나 되나요?": ["현재 실력 에너지", "합격을 가로막는 것", "합격 가능성"],
    "실수할 가능성이 있나요?": ["현재 불안 요소", "집중력 상태", "시험 당일 흐름"],
    "지금 공부 방향이 맞나요?": ["현재 방향의 에너지", "개선할 부분", "올바른 방향"],
    // 학업운 - 공부 흐름
    "요즘 집중력이 떨어진 이유는 무엇인가요?": ["집중력 저하 원인", "현재 내면 상태", "회복 방향"],
    "공부 효율을 높이려면 어떻게 해야 할까요?": ["현재 공부 에너지", "개선이 필요한 부분", "효율적인 방향"],
    "지금 쉬어가는 게 좋을까요?": ["현재 에너지 상태", "휴식의 필요성", "재충전 후 흐름"],
    "슬럼프가 언제쯤 끝날까요?": ["슬럼프의 원인", "현재 상태", "회복의 타이밍"],
    // 학업운 - 진로/선택
    "지금 선택하려는 전공이 맞나요?": ["나의 적성 에너지", "선택의 흐름", "미래 가능성"],
    "진로 방향을 바꾸는 게 좋을까요?": ["현재 진로 에너지", "변화의 흐름", "최선의 방향"],
    "저에게 맞는 분야는 무엇인가요?": ["나의 강점 에너지", "숨겨진 가능성", "앞으로의 방향"],
    // 오늘의 전체 흐름
    "오늘 하루의 전반적인 기운은 어떤가요?": ["아침의 에너지", "낮의 흐름", "저녁의 마무리"],
    "오늘 조심해야 할 일이 있을까요?": ["주의가 필요한 부분", "숨겨진 위험", "대처 방향"],
    "오늘 저에게 들어오는 기회는 무엇인가요?": ["현재 기회의 씨앗", "기회를 키우는 에너지", "기회의 결실"],
    "오늘 운이 좋은 시간대가 있을까요?": ["오전의 에너지", "오후의 흐름", "행운의 타이밍"],
    "오늘 제 감정 상태는 어떨까요?": ["현재 내면의 감정", "감정에 영향을 주는 것", "감정의 흐름"],
    // 오늘의 행운 포인트
    "오늘 행운을 부르는 행동은 무엇인가요?": ["현재 에너지 상태", "행운을 끌어당기는 것", "오늘의 행동 방향"],
    "오늘 피해야 할 선택은 무엇인가요?": ["현재 상황", "피해야 할 에너지", "대안적 방향"],
    "오늘 저에게 좋은 색깔 / 숫자는?": ["오늘의 에너지 색", "행운의 숫자 흐름", "활용 방법"],
    "오늘 연락이 오거나 만날 사람이 있을까요?": ["상대방의 에너지", "두 사람 사이의 흐름", "만남의 가능성"],
    "오늘 예상치 못한 일이 생길까요?": ["숨겨진 변화의 씨앗", "변화의 흐름", "대응 방향"],
    // 인간관계 운
    "오늘 누군가와 갈등이 생길까요?": ["관계의 현재 에너지", "갈등의 원인", "해결 방향"],
    "오늘 저를 도와줄 사람이 있나요?": ["주변의 에너지", "도움의 가능성", "어떻게 받아들일지"],
    "오늘 새로운 인연을 만날 가능성이 있나요?": ["현재 인연의 에너지", "다가올 만남", "인연의 가능성"],
    "오늘 먼저 연락하는 게 좋을까요?": ["현재 관계 에너지", "상대방의 상태", "연락 후 흐름"],
  };

  const positions: [string, string, string] =
    (subQuestion && questionPositions[subQuestion]) || ["과거", "현재", "미래"];

  const cardDesc = cards
    .map(
      (c: { nameKo: string; name: string; isReversed: boolean }, i: number) =>
        cards.length === 1
          ? `뽑힌 카드: ${c.nameKo} - ${c.isReversed ? "역방향" : "정방향"}`
          : `카드 ${i + 1} (${positions[i]}): ${c.nameKo} - ${c.isReversed ? "역방향" : "정방향"}`
    )
    .join("\n");

  const prompt = theme === "advice"
    ? `타로 리더로서 아래 마이너 아르카나 카드로 실질적인 조언을 해주세요.
인사말 없이 바로 조언부터 시작하세요. 편안하고 따뜻한 말투로 "~요" 체를 사용해 주세요.
${subQuestion ? `질문: "${subQuestion}"\n` : ""}
${cardDesc}

이 카드의 에너지를 바탕으로 구체적이고 실질적인 조언을 3~4문장으로 전해주세요.
전체 200자 내외.`
    : cards.length === 1
    ? `타로 리더로서 아래 카드를 해석해 주세요.
인사말, 자기소개, "오늘의 타로 리딩을 시작할게요" 같은 말 없이 바로 카드 해석부터 시작하세요.
편안하고 따뜻한 말투로, "~요" 체를 사용해 주세요.

질문: ${subQuestion || "YES or NO 질문"}
${cardDesc}

카드가 전하는 메시지를 2~3문장으로 이야기하고, 마지막에 상황에 맞는 조언을 한 문장으로 자연스럽게 마무리해 주세요.
전체 200자 내외.`
    : `타로 리더로서 아래 카드들을 해석해 주세요.
인사말, 자기소개, "리딩을 시작할게요" 같은 말 없이 첫 번째 카드 해석부터 바로 시작하세요.
편안하고 따뜻한 말투로, "~요" 체를 사용해 주세요.

주제: ${themeLabel[theme] || "오늘의 운세"}${subQuestion ? `\n질문: "${subQuestion}"` : ""}

뽑힌 카드:
${cardDesc}

아래 형식으로 써 주세요:

1️⃣ 첫 번째 카드 (${positions[0]}) — [카드 이름]
${positions[0]}에 대해 2~3문장으로 이야기해 주세요.

2️⃣ 두 번째 카드 (${positions[1]}) — [카드 이름]
${positions[1]}에 대해 2~3문장으로 이야기해 주세요.

3️⃣ 세 번째 카드 (${positions[2]}) — [카드 이름]
${positions[2]}에 대해 2~3문장으로 이야기해 주세요.

✨ 오늘의 한 마디
세 카드의 흐름을 연결해 핵심 메시지를 한두 문장으로 마무리해 주세요.

전체 500자 내외.${theme === "yesno" ? "\n✨ 오늘의 한 마디 마지막 줄에 조언을 한 문장으로 자연스럽게 마무리해 주세요." : ""}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "당신은 한국어 전용 타로 리더입니다. 반드시 한글(한국어)만 사용하세요. 한자, 중국어, 일본어, 베트남어, 러시아어 등 어떤 외국어 문자도 절대 사용하지 마세요.",
          },
          { role: "user", content: prompt },
        ],
        stream: true,
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(`오류: ${errText}`, { status: 500 });
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const text = filterKorean(json.choices[0]?.delta?.content ?? "");
                if (text) controller.enqueue(encoder.encode(text));
              } catch {
                // 파싱 실패 무시
              }
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Groq 오류:", msg);
    return new Response(`오류: ${msg}`, { status: 500 });
  }
}
