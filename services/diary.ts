export interface DiaryCard {
  id: number;
  nameKo: string;
  slug: string;
  symbol: string;
  isReversed: boolean;
}

export interface DiaryMinorAdvice {
  id: number;
  nameKo: string;
  slug: string;
  symbol: string;
  isReversed: boolean;
  reading: string;
}

export interface DiaryEntry {
  date: string;
  theme: string;
  themeEmoji: string;
  subQuestion: string;
  cards: DiaryCard[];
  reading: string;
  minorAdvice?: DiaryMinorAdvice;
}

const DIARY_KEY = "tarot-done-diary";
const MAX_ENTRIES = 50;

export function getDiaryEntries(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveDiaryEntry(entry: DiaryEntry): void {
  const entries = getDiaryEntries();
  entries.unshift(entry);
  if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
  localStorage.setItem(DIARY_KEY, JSON.stringify(entries));
}

export function deleteDiaryEntry(index: number): void {
  const entries = getDiaryEntries();
  entries.splice(index, 1);
  localStorage.setItem(DIARY_KEY, JSON.stringify(entries));
}
