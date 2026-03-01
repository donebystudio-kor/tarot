export interface TarotCard {
  id: number;
  name: string;
  nameKo: string;
  symbol: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Fool", nameKo: "광대", symbol: "🌟", keywords: ["새로운 시작", "자유", "순수"], uprightMeaning: "새로운 여정의 시작, 무한한 가능성", reversedMeaning: "무모함, 준비 부족, 경솔한 결정" },
  { id: 1, name: "The Magician", nameKo: "마법사", symbol: "✨", keywords: ["의지력", "기술", "창조"], uprightMeaning: "강한 의지와 능력으로 원하는 것을 이룰 수 있음", reversedMeaning: "재능 낭비, 조작, 속임수" },
  { id: 2, name: "The High Priestess", nameKo: "여사제", symbol: "🌙", keywords: ["직관", "신비", "내면"], uprightMeaning: "깊은 직관과 숨겨진 지식을 신뢰하라", reversedMeaning: "비밀, 표면적인 지식, 억눌린 감정" },
  { id: 3, name: "The Empress", nameKo: "여황제", symbol: "🌸", keywords: ["풍요", "모성", "창조성"], uprightMeaning: "풍요로움, 창조적 에너지, 사랑과 나눔", reversedMeaning: "의존, 창의성 막힘, 과보호" },
  { id: 4, name: "The Emperor", nameKo: "황제", symbol: "👑", keywords: ["권위", "구조", "안정"], uprightMeaning: "강한 리더십과 질서, 목표를 향한 체계적 접근", reversedMeaning: "통제욕, 경직됨, 권력 남용" },
  { id: 5, name: "The Hierophant", nameKo: "교황", symbol: "⛪", keywords: ["전통", "지혜", "신뢰"], uprightMeaning: "전통적 가치와 도덕적 지혜를 따르는 시기", reversedMeaning: "규칙에 도전, 비관습적 방식" },
  { id: 6, name: "The Lovers", nameKo: "연인", symbol: "💕", keywords: ["사랑", "선택", "조화"], uprightMeaning: "중요한 선택의 기로, 깊은 유대감 형성", reversedMeaning: "불화, 잘못된 선택, 가치관 충돌" },
  { id: 7, name: "The Chariot", nameKo: "전차", symbol: "⚡", keywords: ["승리", "의지", "전진"], uprightMeaning: "강한 의지로 장애물을 극복하고 성공을 거머쥠", reversedMeaning: "방향 상실, 통제력 부족, 공격성" },
  { id: 8, name: "Strength", nameKo: "힘", symbol: "🦁", keywords: ["용기", "인내", "내면의 힘"], uprightMeaning: "온화한 힘과 인내로 어려움을 이겨냄", reversedMeaning: "자신감 부족, 두려움, 자기 의심" },
  { id: 9, name: "The Hermit", nameKo: "은둔자", symbol: "🕯️", keywords: ["성찰", "고독", "지혜"], uprightMeaning: "내면을 돌아보고 혼자만의 시간이 필요한 때", reversedMeaning: "고립, 외로움, 빛을 거부함" },
  { id: 10, name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", symbol: "🎡", keywords: ["변화", "운명", "순환"], uprightMeaning: "운명의 전환점, 좋은 변화가 찾아옴", reversedMeaning: "불운, 저항, 나쁜 시기" },
  { id: 11, name: "Justice", nameKo: "정의", symbol: "⚖️", keywords: ["공정", "진실", "균형"], uprightMeaning: "공정한 결과와 진실이 드러나는 시기", reversedMeaning: "불공정, 부정직, 불균형" },
  { id: 12, name: "The Hanged Man", nameKo: "매달린 자", symbol: "🔄", keywords: ["희생", "기다림", "새로운 시각"], uprightMeaning: "잠시 멈추고 다른 시각으로 상황을 바라볼 것", reversedMeaning: "지연, 저항, 희생을 거부함" },
  { id: 13, name: "Death", nameKo: "죽음", symbol: "🌑", keywords: ["변환", "끝과 시작", "해방"], uprightMeaning: "한 챕터의 끝, 새로운 시작을 위한 변환", reversedMeaning: "변화 거부, 정체, 두려움" },
  { id: 14, name: "Temperance", nameKo: "절제", symbol: "🌊", keywords: ["균형", "인내", "조화"], uprightMeaning: "균형 잡힌 접근과 인내가 성공을 가져옴", reversedMeaning: "불균형, 과잉, 극단적 행동" },
  { id: 15, name: "The Devil", nameKo: "악마", symbol: "🔗", keywords: ["속박", "집착", "물질"], uprightMeaning: "자신을 묶고 있는 것에서 벗어날 힘이 있음", reversedMeaning: "해방, 속박에서 벗어남" },
  { id: 16, name: "The Tower", nameKo: "탑", symbol: "⚡", keywords: ["급변", "각성", "붕괴"], uprightMeaning: "갑작스러운 변화, 기존 구조의 붕괴와 각성", reversedMeaning: "변화 회피, 내면의 혼란" },
  { id: 17, name: "The Star", nameKo: "별", symbol: "⭐", keywords: ["희망", "영감", "치유"], uprightMeaning: "희망과 영감으로 가득 찬 밝은 미래", reversedMeaning: "절망, 믿음 상실, 방향 상실" },
  { id: 18, name: "The Moon", nameKo: "달", symbol: "🌕", keywords: ["환상", "불안", "무의식"], uprightMeaning: "직관을 믿되, 환상과 현실을 구분하라", reversedMeaning: "혼란 해소, 진실이 드러남" },
  { id: 19, name: "The Sun", nameKo: "태양", symbol: "☀️", keywords: ["기쁨", "성공", "활력"], uprightMeaning: "밝고 긍정적인 에너지, 성공과 행복이 함께함", reversedMeaning: "일시적 장애, 과도한 낙관" },
  { id: 20, name: "Judgement", nameKo: "심판", symbol: "🎺", keywords: ["부활", "각성", "용서"], uprightMeaning: "과거를 돌아보고 새롭게 거듭나는 시간", reversedMeaning: "자기 의심, 과거에 얽매임" },
  { id: 21, name: "The World", nameKo: "세계", symbol: "🌍", keywords: ["완성", "통합", "성취"], uprightMeaning: "목표의 완성, 모든 것이 제자리를 찾음", reversedMeaning: "미완성, 지름길 추구" },
];

export const THEMES = [
  { id: "general", label: "오늘의 운세", emoji: "🔮", description: "오늘 하루 전반적인 흐름" },
  { id: "love", label: "연애운", emoji: "💕", description: "사랑과 관계에 대한 메시지" },
  { id: "career", label: "직장/공부운", emoji: "💼", description: "일과 목표에 관한 방향" },
  { id: "yesno", label: "YES / NO", emoji: "✨", description: "마음속 질문의 답을 구하세요" },
] as const;

export type ThemeId = typeof THEMES[number]["id"];

export const POSITIONS = ["과거", "현재", "미래"] as const;
