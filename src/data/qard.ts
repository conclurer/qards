export interface Card {
  comments: { comment: string; userId: string }[];
  creatorId: string;
  holderHistory: string[]; // user id
  holderId: string | null;
  imageId: string;
  imageUrl: string;
  location: { _lat: number; _long: number }; // Reverse geo
  tags: { tag: string; score: number }[];
  title: string;

  // ours
  score: number;
  serial: number;
}

let serial = 1;
export function mockedCard(title: string, score: number, imageUrl: string): Card {
  return {
    title,
    score,
    serial: serial++,
    location: { lat: 48.6893963, lng: 10.1610948 },
    imageUrl
  } as any;
}
