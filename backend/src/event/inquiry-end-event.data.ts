export interface InquiryEndEventData {
  goldPoint: number;
  scoreMap: {
    id: string;
    name: string;
    score: number;
    totalScore: number;
    deltaWithG: number;
  }[];
}
