export interface Card {
  comments: { comment: string; userId: string }[];
  creatorId: string;
  holderHistory: string[]; // user id
  holderId: string | null;
  imageId: string;
  imageUrl: string;
  location: { lat: number; lng: number }; // Reverse geo
  tags: { tag: string; score: number }[];
  title: string;

  // ours
  score: number;
  serial: number;
}

let serial = 1;
export function mockedCard(title: string, score: number): Card {
  return { title, score, serial: serial++ } as any;
}
