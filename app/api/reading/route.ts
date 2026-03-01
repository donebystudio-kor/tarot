import Groq from "groq-sdk";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("API 키가 설정되지 않았습니다.", { status: 500 });
  }

  const { cards, theme } = await req.json();

  const themeLabel: Record<string, string> = {
    general: "오늘의 운세",
    love: "연애운",
    career: "직장/공부운",
    yesno: "YES or NO 질문",
  };

  const positions = ["과거", "현재", "미래"];
  const cardDesc = cards
    .map(
      (c: { nameKo: string; name: string; isReversed: boolean }, i: number) =>
        `카드 ${i + 1} (${positions[i]}): ${c.nameKo} - ${c.isReversed ? "역방향" : "정방향"}`
    )
    .join("\n");

  const prompt = `당신은 따뜻하고 공감 능력이 뛰어난 타로 리더예요. 마치 오랜 친구에게 이야기하듯 편안하고 진심 어린 말투로 리딩해 주세요.

주제: ${themeLabel[theme] || "오늘의 운세"}

오늘 뽑힌 카드:
${cardDesc}

아래 순서로 이야기해 주세요:

1️⃣ 첫 번째 카드 (과거) — [카드 이름]
이 카드가 과거에 대해 어떤 이야기를 하는지 2~3문장으로 설명해 주세요.

2️⃣ 두 번째 카드 (현재) — [카드 이름]
지금 상황에 대해 이 카드가 전하는 메시지를 2~3문장으로 이야기해 주세요.

3️⃣ 세 번째 카드 (미래) — [카드 이름]
앞으로 어떤 흐름이 펼쳐질지 2~3문장으로 따뜻하게 전해 주세요.

✨ 오늘의 한 마디
세 카드의 흐름을 연결해서 핵심 메시지를 한두 문장으로 마무리해 주세요.

전체 글은 500자 내외로, "~요" 체로 자연스럽게 써 주세요.${theme === "yesno" ? "\n마지막에 YES 또는 NO로 명확하게 답해 주세요." : ""}`;

  try {
    const groq = new Groq({ apiKey });
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      stream: true,
      max_tokens: 600,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
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
