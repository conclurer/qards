import { Card } from 'qards-lib'
export { Card } from 'qards-lib'

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
